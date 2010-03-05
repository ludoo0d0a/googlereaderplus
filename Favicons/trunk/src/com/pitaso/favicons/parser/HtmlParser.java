package com.pitaso.favicons.parser;

import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.pitaso.favicons.io.FileUtil;

public class HtmlParser {

    private static final Logger log = Logger.getLogger(HtmlParser.class.getName());

    private final static Pattern reLinkFaviconDirect = Pattern.compile(
	    "<LINK[^>]*?REL=[\\\"'](SHORTCUT\\W+)?ICON[\\\"'].*\\s+href=\\\"([^\\\"']*)",
	    Pattern.CASE_INSENSITIVE);

    private final static Pattern reProtocol = Pattern.compile("^https?:", Pattern.CASE_INSENSITIVE);
    private final static Pattern reCleanUrl = Pattern.compile("([^\\?]+)\\??(.*)",
	    Pattern.CASE_INSENSITIVE);
    private final static Pattern reDomain = Pattern.compile("^http://[^/]+",
	    Pattern.CASE_INSENSITIVE);

    private final static Pattern reContext = Pattern.compile("^http://(.*)/?",
	    Pattern.CASE_INSENSITIVE);
    private final static Pattern rePath = Pattern.compile("^([\\\\/\\.]*)",
	    Pattern.CASE_INSENSITIVE);

    // public static void main(String[] args) {
    // HtmlParser p = new HtmlParser();
    // System.out.println(p.getDomain("http://www.lemonde.fr/tu_tu/titi?tutu=1&z=#12-1"));
    // System.out.println(p.cleanUrl("http://www.lemonde.fr/tu_tu/titi?tutu=1&z=#12-1"));
    //	
    // System.out.println(p.normalizeUrl("http://lemonde.fr/tu_tu/titi?tutu=1&z=#12-1"));
    // System.out.println(p.normalizeUrl("http://www.lemonde.fr/tu_tu/titi?tutu=1&z=#12-1"));
    // System.out.println(p.normalizeUrl("lemonde.fr/tu_tu/titi?tutu=1&z=#12-1"));
    // }

    public String getFavicon(String url) {
	log.info("url: " + url);
	String html = FileUtil.download(url);
	// log.info("html="+html.substring(0,200));
	String icon = null;
	if (html != null && html.trim().length() > 0) {
	    icon = parseFavicon(html, url);
	}
	if (icon == null) {
	    log.info("No icon in HTML");
	    icon = getDomain(url) + "/favicon.ico";
	    log.info("domain " + getDomain(url));
	}

	return icon;
    }

    private String parseFavicon(String html, String url) {
	String icon = null;

	Matcher matcher = reLinkFaviconDirect.matcher(html);
	if (matcher.find()) {
	    icon = matcher.group(2);
	}

	if (icon == null) {
	    icon = getContext(url) + "/favicon.ico";
	} else {
	    // Add domain if relative url
	    Matcher matcher3 = reProtocol.matcher(icon);
	    if (!matcher3.find()) {
		if (icon.startsWith("/")) {
		    // domain+icon
		    icon = getDomain(url) + '/' + cleanStartPath(icon);
		} else {
		    // context+icon
		    icon = getContext(url) + '/' + icon;
		}
	    }
	}
	icon = normalizeUrl(icon);
	return icon;
    }

    private String cleanStartPath(String path) {
	Matcher matcher = rePath.matcher(path);
	String out = path;
	if (matcher.find()) {
	    out = matcher.replaceAll("");
	}
	return out;
    }

    private String getContext(String url) {
	Matcher matcher = reContext.matcher(url);
	String out = null;
	if (matcher.find()) {
	    out = matcher.group(1);
	}
	return out;
    }

    private String getDomain(String url) {
	Matcher matcher = reDomain.matcher(url);
	String out = null;
	if (matcher.find()) {
	    out = matcher.group(0);
	}
	return out;
    }

    public String normalizeUrl(String url) {
	String out = url;
	// Add http if not there
	if (url != null) {
	    Matcher matcher = reProtocol.matcher(url);
	    if (!matcher.find()) {
		out = "http://" + url;
	    }

	    // Ensure www. is there
	    String domain = getDomain(out);
	    // Add www if not there
	    int points = domain.length() - domain.replaceAll("\\.", "").length();
	    if (points < 2) {
		out = out.replaceFirst("://", "://www.");
	    }

	    // Clean jsessionid or anything else after ;
	    out = out.replaceAll(";.*", "");
	}

	return out;
    }

    // without parameter
    private String cleanUrl(String url) {
	String out = null;
	Matcher matcher = reCleanUrl.matcher(url);

	if (matcher.find()) {
	    out = matcher.group(1);
	}
	return out;
    }
}
