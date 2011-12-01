package com.pitaso.readerplus.service;

import com.pitaso.readerplus.pojo.Item;
import com.pitaso.readerplus.pojo.ItemFavicons;

public class FaviconsServlet extends AbstractWeDataServlet<ItemFavicons>{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -7707518043701502765L;
	
	private static final String DATABASE = "Favicons";
	
	@Override
	public String getDatabase() {
		return DATABASE;
	}

	@Override
	protected void filterItem(Item item, int pos) {
		if (item instanceof ItemFavicons){
			ItemFavicons itemf = (ItemFavicons) item;
			itemf.setName(""+pos);
		}
	}


	
}
