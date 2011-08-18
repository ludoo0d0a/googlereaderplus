package com.pitaso.readerplus.service;

import com.pitaso.readerplus.pojo.ItemReplacer;

public class ReplacerServlet extends AbstractWeDataServlet<ItemReplacer>{

	/**
	 * 
	 */
	private static final long serialVersionUID = -8930935362394876465L;
	
	//private static final String KEY_REPLACER = "replacer";
	private static final String DATABASE = "Replacer";
	
	@Override
	public String getDatabase() {
		return DATABASE;
	}

	
}
