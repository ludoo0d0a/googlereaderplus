package com.pitaso.favicons;

import java.io.IOException;
import javax.servlet.http.*;

import com.pitaso.favicons.parser.HtmlParser;
import com.pitaso.favicons.service.IconService;

@SuppressWarnings("serial")
public class FaviconsServlet extends HttpServlet {
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
	resp.setContentType("image/png");
	
	//http://localhost:8888/favicons?url=http://www.lemonde.fr
	//http://localhost:8888/favicons?url=file://C:/dev/html/lemonde.fr.htm
	
	IconService iconService = new IconService();
	
	String url = req.getParameter("url");
	String icon=null;
	if (url!=null && url.trim().length()>0){
	    icon = iconService.getIcon(url);
	    if (icon==null){
		//parse Webpage to get favicons
		HtmlParser parser = new HtmlParser();
		icon = parser.getFavicon(url);
		iconService.save(url, icon);
	    }
	}else{
	    String servletUrl = req.getRequestURL().toString();
	    icon=servletUrl+"/blank.png";
	}
	
	resp.sendRedirect(icon);
    }
}
