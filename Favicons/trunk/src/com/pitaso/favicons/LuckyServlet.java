package com.pitaso.favicons;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.codehaus.jackson.map.ObjectMapper;

import com.pitaso.favicons.io.FileUtil;

@SuppressWarnings("serial")
public class LuckyServlet extends HttpServlet {

    private static final Logger log = Logger.getLogger(FaviconsServlet.class.getName());
    private static final String URL_ALEXA = "http://www.alexa.com/topsites/global;";
    private final static Pattern reLinks = Pattern.compile(
	    "<h2><a\\shref=\"\\/siteinfo\\/([^\"]+)\">([^<]*)<\\/a><\\/h2>",
	    Pattern.CASE_INSENSITIVE);

    public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
	doAction(req, resp);
    }
/*
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
	doAction(req, resp);
    }
*/
    
    public void doAction(HttpServletRequest req, HttpServletResponse resp) throws IOException {
	String page = req.getParameter("p");
	// String format= req.getParameter("f");

	String html = null;
	int p = 1;
	if (StringUtils.isNotBlank(page)) {
	    p = Integer.parseInt(page);
	} else {
	    p = 1;
	}
	html = FileUtil.downloadHtml(URL_ALEXA + p);

	List<String> links = null;
	if (StringUtils.isNotBlank(html)) {
	    links = getLinks(html);
	}
	ObjectMapper mapper = new ObjectMapper();
	mapper.writeValue(resp.getOutputStream(), links);
    }

    private List<String> getLinks(String html) {
	Matcher matcher = reLinks.matcher(html);
	List<String> links = new ArrayList<String>();
	while (matcher.find()) {
	    links.add(matcher.group(1));
	}
	return links;
    }

    private void print(HttpServletResponse resp, String text) {
	try {
	    resp.getOutputStream().print(text);
	} catch (IOException e) {
	    log.severe(e.getMessage());
	}
    }
}
