package com.pitaso.readerplus.service;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CronRecacheServlet extends AbstractWeDataServlet{


	private String database = null;
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1420324030456608497L;

	@Override
	public String getDatabase() {
		return null;
	}

	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
	throws IOException {
		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
		String database = req.getParameter("database");
		update(database);//run queue
		resp.getWriter().println("[]");
	}
	
	
	
}
