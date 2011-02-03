package com.pitaso.readerplus.service;

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

import com.google.appengine.api.memcache.jsr107cache.GCacheFactory;
import com.google.appengine.api.taskqueue.Queue;
import com.google.appengine.api.taskqueue.QueueFactory;
import com.google.appengine.api.taskqueue.TaskOptions;
import com.google.appengine.api.taskqueue.TaskOptions.Method;

import static com.google.appengine.api.taskqueue.TaskOptions.Builder.*;

@SuppressWarnings("serial")
public abstract class AbstractWeDataServlet extends HttpServlet {

	private static final Logger log = Logger
			.getLogger(AbstractWeDataServlet.class.getName());

	public abstract String getDatabase();

	public abstract String getKey();

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		resp.setContentType("application/json");

		Cache cache = null;

		Map props = new HashMap();
		props.put(GCacheFactory.EXPIRATION_DELTA, 3600);// 3600s 1h

		try {
			CacheFactory cacheFactory = CacheManager.getInstance().getCacheFactory();
			cache = cacheFactory.createCache(props);
		} catch (CacheException e) {
			// ...
		}

		String out = null;
		String reload = req.getParameter("reload");
		boolean isReload = ("1".equals(reload));
		if (!isReload){
			out = (String) cache.get(getKey());
		}
		if (out == null) {
			String pqueue = req.getParameter("queue");
			boolean isQueue = ("1".equals(pqueue));
			if (isQueue){
				out = getContent("http://wedata.net/databases/"+getDatabase()+"/items.json");
				if (out!=null){
					out=compactJson(out);
					if (cache!=null && out!=null){
						log.log(Level.INFO, "size"+out.length());
						cache.put(getKey(), out);
						out = "{\"reload\":1,\"queue\":1}";
					}else{
						out = "{\"reload\":0,\"queue\":1,\"error\":\"cache or out null\"}";
					}
				}else{
					out = "{\"reload\":0,\"queue\":1,\"error\":\"no content\"}";
				}
			}else{
				Queue queue = QueueFactory.getQueue("reloadqueue");
		        queue.add(withUrl("/"+getDatabase()).param("reload", "1").param("queue", "1").method(Method.GET));
		        out = "{\"reload\":1}";
			}
			
		}
		if (out == null) {
			out = "[]";
		}

		resp.getWriter().println(out);
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
