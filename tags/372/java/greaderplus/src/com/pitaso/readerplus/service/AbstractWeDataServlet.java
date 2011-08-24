package com.pitaso.readerplus.service;

import static com.google.appengine.api.taskqueue.TaskOptions.Builder.withUrl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.cache.Cache;
import javax.cache.CacheException;
import javax.cache.CacheFactory;
import javax.cache.CacheManager;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;

import com.google.appengine.api.taskqueue.Queue;
import com.google.appengine.api.taskqueue.QueueFactory;
import com.google.appengine.api.taskqueue.TaskOptions.Method;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.pitaso.readerplus.pojo.Item;

@SuppressWarnings("serial")
public abstract class AbstractWeDataServlet<T extends Item> extends HttpServlet {

	protected static final String PREFIX_SPLIT = "==";
	private static final Logger log = Logger
			.getLogger(AbstractWeDataServlet.class.getName());
	//private static final int INFINITUM = 99000;
	// set to true for main redirect servlet
	// <application>greaderplus</application>
	// set to false for cluster nodes where X is the node number
	// <application>greaderplusX</application>
	private static final boolean REDIRECT = false;

	private static final boolean REQUEST_PER_PAGE = true;
	private static final boolean SPLIT_CACHE = true;
	
	private static final int NODES = 13;
	
	private static final int CACHE_COUNT = 200;
	private static final int TIMEOUT_REQUEST = 10000;//10s max

	public void redirect(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		// greaderplus1-4
		// greaderplus01-09

		int node = (int) Math.round(Math.random() * (NODES - 1)) + 1;
		String key = String.valueOf(node);
		if (node > 4) {
			key = "0" + (node - 4);
		}

		log.info("Redirect on node " + key);
		String url = "http://greaderplus" + key + ".appspot.com"
				+ req.getServletPath();
		resp.sendRedirect(url);
	}

	public abstract String getDatabase();

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		if (REDIRECT) {
			redirect(req, resp);
		} else {
			resp.setContentType("application/json");
			resp.setCharacterEncoding("UTF-8");
			resp.setHeader("Cache-Control", "max-age=7200, public");

			String reload = req.getParameter("reload");
			String out = null;
			String cached = "1";
			String database = getDatabase();
			if ("1".equals(reload)) {
				// force reloading
				cached = "0";
				out = populate(database);
			} else {
				Cache cache = getCache();
				out = readFromCache(cache, database);
				if (out == null) {
					cached = "0";
					out = populate(database);
				}
			}
			resp.setHeader("GRP-cached", cached);
			resp.getWriter().println(out);
		}
	}

	protected String populate(String database) {
		String out = null;
		if (database != null) {
			String content = getContent("http://wedata.net/databases/" + database + "/items.json");
			if (content != null) {
				Cache cache = getCache();
				out = putInCache(content, database, cache);
				if (out == null) {
					out = "{\"error\":\"cache or out null\"}";
				}
			} else {
				out = "{\"error\":\"no content\"}";
			}
		}

		return out;
	}

	private String putInCache(String out, String database, Cache cache) {
		if (cache != null && out != null) {
			log.log(Level.INFO, "size" + out.length());
			if (SPLIT_CACHE) {
				splitJson(out, database, CACHE_COUNT);
			} else {
				String cout = compactJson(out);
				cache.put(database, cout);
			}
		}
		return "";
	}

	private String readFromCache(Cache cache, String database) {
		String out = null;
		if (cache != null) {
			out = (String) cache.get(database);
			if (out!=null && out.startsWith(PREFIX_SPLIT)) {
				out = readfromAllCaches(out, cache, database);
			}
		}
		return out;
	}

	private String readfromAllCaches(String out, Cache cache, String database) {
		int size = Integer.parseInt(out.replaceFirst(PREFIX_SPLIT, ""));
		Gson gson = new GsonBuilder().create();
		List<Item> all = new ArrayList<Item>();
		for (int i = 0; i < size; i++) {
			String json = (String) cache.get(database + "_" + i);
			if (json != null) {
				List<T> items = getJsonFromString(json);
				all.addAll(items);
			}
		}
		String response = gson.toJson(all);
		return response;
	}
	
	/**
	 * Update cache if empty using a queue
	 */
	public void update() {
		update(getDatabase());
	}

	public void update(String database) {
		if (database != null) {
			// RatedCache cache = new RatedCache();
			Cache cache = getCache();
			String out = readFromCache(cache, database);
			if (out == null) {
				Queue queue = QueueFactory.getQueue("reloadqueue");
				queue.add(withUrl("/queue/recache").param("database", database)
						.method(Method.POST));
			}
		}
	}

	protected Cache getCache() {
		Map<String, String> props = new HashMap<String, String>();
		// props.put(GCacheFactory.EXPIRATION_DELTA, 3600);// 3600s 1h

		Cache cache = null;
		try {
			CacheFactory cacheFactory = CacheManager.getInstance()
					.getCacheFactory();
			cache = cacheFactory.createCache(props);
		} catch (CacheException e) {
			// ...
		}
		return cache;
	}


	public List<T> getJsonFromString(String json) {
		Type listType = new TypeToken<List<T>>() {}.getType();
		List<T> items = new Gson().fromJson(json, listType);
		return items;
	}
	

	/*public String compactJson(String json) {
		return json;
	}*/

	public String compactJson(String json) {
		List<T> items = getJsonFromString(json);
		
		int i=0;
		for (Item item : items) {
			filterItem(item, i);
		}
	
		//Gson gson = new GsonBuilder().setPrettyPrinting().create();
		Gson gson = new GsonBuilder().create();
		String out = gson.toJson(items);
		return out;
	}
	
	public void splitJson(String json, String database, int count) {
		List<T> items = getJsonFromString(json);

		// Gson gson = new GsonBuilder().setPrettyPrinting().create();
		Gson gson = new GsonBuilder().create();

		Cache cache = getCache();

		// Pagination
		int size = items.size();
		int step = (int) Math.floor(size / count);
		int pos = 0;
		for (int i = 0; i < step; i++) {
			for (int j = 0; j < count && i + j < size; j++) {
				Item item = items.get(i + j);
				filterItem(item, pos);
				pos++;
			}
			String out = gson.toJson(items);
			cache.put(database + "_" + i, out);
		}
		cache.put(database, PREFIX_SPLIT + step);
	}

	protected void filterItem(Item item, int pos) {
		//
	}
	
	public String getContent(String url) {
		if (REQUEST_PER_PAGE){
			return getContentJsonPaging(url);
		}else {
			return getContentJson(url);
		}
	}

	public String getContentJson(String url) {
		log.info("get url:" + url);
		log.fine("fget url:" + url);
		String s = null;
		try {
			URL u = new URL(url);
			URLConnection urlConnection = u.openConnection();
			InputStream is = urlConnection.getInputStream();
			urlConnection.setConnectTimeout(TIMEOUT_REQUEST);
			urlConnection.setReadTimeout(TIMEOUT_REQUEST);
			BufferedReader reader = new BufferedReader(
					new InputStreamReader(is));

			String line;
			StringBuffer bf = new StringBuffer();
			while ((line = reader.readLine()) != null) {
				bf.append(line);
			}
			reader.close();
			s = bf.toString();
		} catch (MalformedURLException e) {
			// ...
			log.warning("MalformedURLException:" + e.getMessage());
		} catch (IOException e) {
			// ...
			log.warning("IOException:" + e.getMessage());
		}
		return s;
	}
	
	public String getContentJsonPaging(String url) {
		int page=0;
		String r=null;
		boolean loop=true;
		List<String> out= new ArrayList<String>();
		while(loop && page++<1000){
			r = getContentJson(url+"?page="+page);
			if (r==null || r.length()<=10){
				loop=false;
			}else{
				//remove "[]"
				r=r.replaceFirst("^\\[", "").replaceFirst("\\]$","");
				out.add(r);
			}
		}
		log.info("Downloaded "+page+" pages on "+url);
		return "["+StringUtils.join(out,",")+"]";
	}

}
