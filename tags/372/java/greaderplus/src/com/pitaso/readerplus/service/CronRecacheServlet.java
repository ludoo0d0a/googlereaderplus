package com.pitaso.readerplus.service;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.pitaso.readerplus.pojo.ItemNull;

public class CronRecacheServlet extends AbstractWeDataServlet<ItemNull>{

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
