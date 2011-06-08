package com.pitaso.readerplus.service;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class QueueRecacheServlet extends AbstractWeDataServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = 6956785182037586376L;

	@Override
	public String getDatabase() {
		return null;
	}

	public void doPost(HttpServletRequest req, HttpServletResponse resp)
	throws IOException {
		doStuff(req, resp);
	}
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
	throws IOException {
		doStuff(req, resp);
	}
	
	private void doStuff(HttpServletRequest req, HttpServletResponse resp)
	throws IOException {
		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
		
		String database = req.getParameter("database");
		populate(database);
		resp.getWriter().println("[]");
	}
	
	
	
	
}
