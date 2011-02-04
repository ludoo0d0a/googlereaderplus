package com.pitaso.readerplus.service;

import static com.google.appengine.api.taskqueue.TaskOptions.Builder.withUrl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
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

import com.google.appengine.api.taskqueue.Queue;
import com.google.appengine.api.taskqueue.QueueFactory;
import com.google.appengine.api.taskqueue.TaskOptions.Method;

@SuppressWarnings("serial")
public abstract class AbstractWeDataServlet extends HttpServlet {

	private static final Logger log = Logger
			.getLogger(AbstractWeDataServlet.class.getName());

	public abstract String getDatabase();

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
		resp.setHeader("Cache-Control", "max-age=3600, public");

		String reload = req.getParameter("reload");
		String out = null;
		String cached = "1";
		if ("1".equals(reload)) {
			//force reloading
			cached = "0";
			out = populate(getDatabase());
		}else{
			Cache cache = getCache();
			out = (String) cache.get(getDatabase());
			if (out == null) {
				cached = "0";
				out = populate(getDatabase());
			}
		}
		resp.setHeader("GRP-cached", cached);
		resp.getWriter().println(out);
	}

	protected String populate(String database) {
		String out = null;
		if (database != null) {
			out = getContent("http://wedata.net/databases/" + database
					+ "/items.json");
			if (out != null) {
				out = compactJson(out);
				Cache cache = getCache();
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
		return out;
	}

	/**
	 * Update cache if empty using a queue
	 */
	public void update() {
		Cache cache = getCache();

		String out = (String) cache.get(getDatabase());
		if (out == null) {
			Queue queue = QueueFactory.getQueue("reloadqueue");
			queue.add(withUrl("/queue/recache")
					.param("database", getDatabase()).method(Method.POST));
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
