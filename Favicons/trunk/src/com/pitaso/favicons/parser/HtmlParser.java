package com.pitaso.favicons.parser;

import java.io.File;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.pitaso.favicons.io.FileUtil;

public class HtmlParser {

    private final static Pattern reLinkFavicon = Pattern.compile(
	    "<LINK[^>]*?REL=[\"'](SHORTCUT\\W+)?ICON[\"'][^>]*?>", Pattern.CASE_INSENSITIVE);
    private final static Pattern reLinkHref = Pattern.compile("[\"'](.*?)[\"']",
	    Pattern.CASE_INSENSITIVE);
    private final static Pattern reProtocol = Pattern.compile("^http:", Pattern.CASE_INSENSITIVE);
    private final static Pattern reCleanUrl = Pattern.compile("([^\\?]+)\\??(.*)",
	    Pattern.CASE_INSENSITIVE);
    private final static Pattern reNormalizeUrl = Pattern.compile("^http(s)?:",
	    Pattern.CASE_INSENSITIVE);

    public String getFavicon(String url)  {
	String html=FileUtil.download(url);
	String icon = null;
	if (html != null && html.trim().length()>0) {
	    icon = parseFavicon(html, url);
	}
	if (icon == null) {
	    icon = getDomain(url) + "/favicon.ico";
	}

	return icon;
    }

    private String parseFavicon(String html, String url) {
	String icon = null;

	Matcher matcher = reLinkFavicon.matcher(html);
	if (matcher.find()) {
	    String link = matcher.group(1);
	    Matcher matcher2 = reLinkFavicon.matcher(link);
	    if (matcher2.find()) {
		icon = matcher2.group(1);
	    }
	}

	if (icon == null) {
	    icon = cleanUrl(url) + "/favicon.ico";
	} else {
	    // Add domain if relative url
	    Matcher matcher3 = reProtocol.matcher(icon);
	    if (matcher3.find()) {
		icon = url + '/' + icon;
	    }
	}
	icon = normalizeUrl(icon);
	return icon;
    }

    private String getDomain(String url) {
	// TODO Auto-generated method stub
	return null;
    }

    private String normalizeUrl(String url) {
	String out = null;
	Matcher matcher = reNormalizeUrl.matcher(url);
	if (matcher.find()) {
	    out = "http://" + url;
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
