package com.pitaso.readerplus.service;

import static com.google.appengine.api.taskqueue.TaskOptions.Builder.withUrl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
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
import com.google.appengine.repackaged.com.google.common.base.StringUtil;

@SuppressWarnings("serial")
public abstract class AbstractWeDataServlet extends HttpServlet {

	private static final Logger log = Logger
			.getLogger(AbstractWeDataServlet.class.getName());
	private static final int INFINITUM = 99000;
	private static final int NODES = 3;
	//set to false for main redirect servlet <application>greaderplus</application>
	//set to true for cluster nodes where X is the node number <application>greaderplusX</application>
	private static final boolean REDIRECT = true;

	public abstract String getDatabase();

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		if (REDIRECT) {
			redirect(req, resp);
		}else{
			resp.setContentType("application/json");
			resp.setCharacterEncoding("UTF-8");
			resp.setHeader("Cache-Control", "max-age=7200, public");
	
			String reload = req.getParameter("reload");
			String out = null;
			String cached = "1";
			if ("1".equals(reload)) {
				// force reloading
				cached = "0";
				out = populate(getDatabase());
			} else {
				Cache cache = getCache();
				// RatedCache cache = new RatedCache();
				out = (String) cache.get(getDatabase());
				if (out == null) {
					cached = "0";
					out = populate(getDatabase());
				}
			}
			resp.setHeader("GRP-cached", cached);
			resp.getWriter().println(out);
		}
	}

	public void redirect(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		int node = (int) Math.round(Math.random() * (NODES - 1)) + 1;
		log.info("Redirect on node " + node);
		String url = "http://greaderplus" + node + ".appspot.com"
				+ req.getServletPath();
		resp.sendRedirect(url);
	}

	protected String populate(String database) {
		String out = null;
		if (database != null) {
			out = getContent(
			/*out = getContentJsonPaging(*/
					"http://wedata.net/databases/" + database
					+ "/items.json");

			// Debug
			// out = getDummyString();

			if (out != null) {
				out = compactJson(out);
				Cache cache = getCache();
				// RatedCache cache = new RatedCache();
				if (cache != null && out != null) {
					log.log(Level.INFO, "size" + out.length());
					cache.put(database, out);
				} else {
					out = "{\"error\":\"cache or out null\"}";
				}
			} else {
				out = "{\"error\":\"no content\"}";
			}
		}

		// Debug
		// RatedCache cache2 = new RatedCache();
		// out = (String) cache2.get(database);

		return out;
	}

	private String getDummyString() {
		StringBuffer sb = new StringBuffer(10 * INFINITUM);
		for (int i = 0; i < INFINITUM; i++) {
			sb.append("dummydumm_");
		}

		return sb.toString();
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
			String out = (String) cache.get(database);
			if (out == null) {
				Queue queue = QueueFactory.getQueue("reloadqueue");
				queue.add(withUrl("/queue/recache").param("database", database)
						.method(Method.POST));
			}
		}
	}

	private Cache getCache() {
		Map props = new HashMap();
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

	public String compactJson(String json) {
		return json;
	}

	public String getContentJsonPaging(String url) {
		int page=0;
		String r=null;
		boolean loop=true;
		List<String> out= new ArrayList<String>();
		while(loop && page++<1000){
			r = getContent(url+"?page="+page);
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
	public String getContent(String url) {
		log.info("get url:"+url);
		log.fine("fget url:"+url);
		String s = null;
		try {
			URL u = new URL(url);
			URLConnection urlConnection = u.openConnection();
			InputStream is = urlConnection.getInputStream();
			urlConnection.setConnectTimeout(10000);
			urlConnection.setReadTimeout(10000);
			BufferedReader reader = new BufferedReader(new InputStreamReader(is));
			
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
}
