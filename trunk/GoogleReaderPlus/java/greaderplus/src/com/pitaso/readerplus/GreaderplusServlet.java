package com.pitaso.readerplus;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.cache.Cache;
import javax.cache.CacheException;
import javax.cache.CacheFactory;
import javax.cache.CacheManager;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.memcache.jsr107cache.GCacheFactory;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

@SuppressWarnings("serial")
public class GreaderplusServlet extends HttpServlet {

	private static final Object KEY_REPLACER = "replacer";
	 private static final Logger log = Logger.getLogger(GreaderplusServlet.class.getName());

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		resp.setContentType("application/json");

		Cache cache = null;

		Map props = new HashMap();
		props.put(GCacheFactory.EXPIRATION_DELTA, 3600);// 3600s 1h

		try {
			CacheFactory cacheFactory = CacheManager.getInstance()
					.getCacheFactory();
			cache = cacheFactory.createCache(props);
		} catch (CacheException e) {
			// ...
		}

		String out = (String) cache.get(KEY_REPLACER);
		
		String reload = req.getParameter("reload");
		if ("1".equals(reload)){
			out = null;
		}
		if (out == null) {
			out = getContent("http://wedata.net/databases/Replacer/items.json");
			if (out!=null){
				out=compactJson(out);
				cache.put(KEY_REPLACER, out);
			}
		}
		if (out == null) {
			out = "";
		}

		resp.getWriter().println(out);
	}

	private String compactJson(String json) {
		Type listType = new TypeToken<List<Item>>() {}.getType();
		List<Item> items = new Gson().fromJson(json, listType);
		
		//Gson gson = new GsonBuilder().setPrettyPrinting().create();
		Gson gson = new GsonBuilder().create();
		String out = gson.toJson(items);
		return out;
	}

	public String getContent(String url) {
		String s = null;
		try {
			URL u = new URL(url);
			BufferedReader reader = new BufferedReader(new InputStreamReader(u
					.openStream()));
			String line;
			StringBuffer bf = new StringBuffer(); 
			while ((line = reader.readLine()) != null) {
				bf.append(line);
			}
			reader.close();
			s=bf.toString();
		} catch (MalformedURLException e) {
			// ...
			log.warning("MalformedURLException:"+e.getMessage());
		} catch (IOException e) {
			// ...
			log.warning("IOException:"+e.getMessage());
		}
		return s;
	}
}
