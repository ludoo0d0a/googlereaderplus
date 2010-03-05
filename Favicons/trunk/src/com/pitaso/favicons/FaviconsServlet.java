package com.pitaso.favicons;

import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.net.URL;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;

import net.sf.json.JSONObject;
import net.sf.jsr107cache.Cache;
import net.sf.jsr107cache.CacheException;
import net.sf.jsr107cache.CacheManager;

import com.pitaso.favicons.io.FileUtil;
import com.pitaso.favicons.parser.HtmlParser;
import com.pitaso.favicons.service.IconService;

@SuppressWarnings("serial")
public class FaviconsServlet extends HttpServlet {

    private static final Logger log = Logger.getLogger(FaviconsServlet.class.getName());
    private String servletUrl = null;
    private String defaultIconUrl = null;
    private String defaultIconFile = null;
    private Cache cache = null;
    private Cache cacheBytes;

    /**
     * 
     * http://localhost:8888/favicons?url=http://www.lemonde.fr
     * http://localhost:8888/favicons?url=file://C:/dev/html/lemonde.fr.htm
     * 
     */
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
	String cache = req.getParameter("cache");
	if (cache != null && "clear".equals(cache)) {
	    clearCache(resp);
	} else {
	    doGetIcon(req, resp);
	}
    }

    private void initServlet(HttpServletRequest req) {
	try {
	    cache = CacheManager.getInstance().getCacheFactory()
		    .createCache(Collections.emptyMap());
	    cacheBytes = CacheManager.getInstance().getCacheFactory().createCache(
		    Collections.emptyMap());
	} catch (CacheException e) {
	    log.severe("Error on cache creation");
	}

	servletUrl = req.getRequestURL().toString();
	defaultIconUrl = servletUrl + "/blank.png";
	defaultIconFile = "favicons/blank.png";
    }

    /**
     * Clear cache
     * 
     * @param resp
     */
    private void clearCache(HttpServletResponse resp) {
	try {
	    cache.clear();
	    cacheBytes.clear();
	    print(resp, "Caches cleared");
	} catch (Exception e) {
	    log.severe(e.getMessage());
	}
    }

    private void print(HttpServletResponse resp, String text) {
	try {
	    resp.getOutputStream().print(text);
	} catch (IOException e) {
	    log.severe(e.getMessage());
	}
    }

    public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
	initServlet(req);

	log.info("Post");

	resp.setContentType("application/json");

	HtmlParser parser = new HtmlParser();

	List<String> urls = Arrays.asList(req.getParameterValues("url"));
	Map<String, String> icons = new HashMap<String, String>();
	if (urls != null) {
	    for (String urlin : urls) {
		String url = parser.normalizeUrl(urlin);
		String icon = getIcon(url, cache, parser);
		if (icon != null) {
		    icons.put(url, icon);
		}
	    }
	}

	JSONObject out = JSONObject.fromObject(icons);

	print(resp, out.toString());
    }

    /**
     * Server icon url
     * 
     * @param req
     * @param resp
     * @throws IOException
     * @throws ServletException
     */
    public void doGetIcon(HttpServletRequest req, HttpServletResponse resp) throws IOException {
	initServlet(req);

	// resp.setContentType("image/png");
	HtmlParser parser = new HtmlParser();

	String forward = req.getParameter("f");
	String url = parser.normalizeUrl(req.getParameter("url"));
	String icon = getIcon(url, cache, parser);

	if ("1".equals(forward)) {
	    forward(resp, icon);
	} else {
	    resp.sendRedirect(icon);
	}

    }

    /**
     * Retrieve icon from url
     * 
     * @param url
     * @param cache
     * @param parser
     * @return
     */
    private String getIcon(String url, Cache cache, HtmlParser parser) {
	String icon = null;
	if (StringUtils.isNotBlank(url)) {
	    icon = (String) cache.get(url);
	    if (StringUtils.isBlank(icon)) {
		IconService iconService = new IconService();
		icon = iconService.getIcon(url);
		if (icon == null) {
		    // parse Webpage to get favicons
		    icon = parser.getFavicon(url);
		    iconService.save(url, icon);
		}
		if (icon != null) {
		    cache.put(url, icon);
		}
	    }
	}

	if (StringUtils.isBlank(icon)) {
	    icon = defaultIconUrl;
	}
	return icon;
    }

    /**
     * Forward binary data
     * 
     * @param res
     * @param urlin
     * @throws IOException
     */
    public void forward(final HttpServletResponse res, String urlin) throws IOException {
	try {
	    byte[] b = null;
	    b = (byte[]) cacheBytes.get(urlin);
	    if (b == null) {
		URL url = new URL(urlin);
		b = FileUtil.download(url);
	    }
	    if (b == null) {
		// res.sendRedirect(defaultIcon);
		forward(res, new File(defaultIconFile));
	    } else {
		ServletOutputStream out = res.getOutputStream();
		// res.setContentType("application/octet-stream");
		res.setContentType("image/x-icon");
		out.write(b);
		cacheBytes.put(urlin, b);
	    }
	} catch (Exception e) {
	    log.severe(e.getMessage());
	    res.sendRedirect(defaultIconUrl);
	}
    }

    public void forward(final HttpServletResponse res, File file) throws IOException {

	ServletOutputStream out = null;
	RandomAccessFile raf = null;

	// if not exists abort
	if (file != null && file.exists()) {
	    try {
		// res.setContentType("application/octet-stream");
		res.setContentType("image/x-icon");

		// setResponseHeaders(res);

		raf = new RandomAccessFile(file, "r");
		res.setContentLength((int) raf.length());
		out = res.getOutputStream();

		final byte[] loader = new byte[(int) raf.length()];
		while ((raf.read(loader)) > 0) {
		    out.write(loader);
		}
	    } catch (final IOException e) {
		throw new IOException("File not found : " + file);
	    } catch (final Exception e) {
		log.severe("Exception in execution of the stream service");
	    } finally {
		if (out != null) {
		    out.flush();
		    out.close();
		}
		if (raf != null) {
		    raf.close();
		}
	    }
	} else {
	    throw new IOException("File not found:" + file);
	}
    }

}
