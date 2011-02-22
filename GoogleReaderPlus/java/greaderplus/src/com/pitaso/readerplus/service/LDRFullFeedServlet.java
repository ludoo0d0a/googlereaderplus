package com.pitaso.readerplus.service;

import java.lang.reflect.Type;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.pitaso.readerplus.pojo.ItemFavicons;
import com.pitaso.readerplus.pojo.ItemLDRFullFeed;

public class LDRFullFeedServlet extends AbstractWeDataServlet{


	/**
	 * 
	 */
	private static final long serialVersionUID = -3438080955825682063L;
	private static final String DATABASE = "LDRFullFeed";
	
	@Override
	public String getDatabase() {
		return DATABASE;
	}
	@Override
	public String compactJson(String json) {
		Type listType = new TypeToken<List<ItemLDRFullFeed>>() {}.getType();
		List<ItemLDRFullFeed> items = new Gson().fromJson(json, listType);
		
		int i=0;
		for (ItemLDRFullFeed item : items) {
			item.setName(""+(++i));
		}
		
		//Gson gson = new GsonBuilder().setPrettyPrinting().create();
		Gson gson = new GsonBuilder().create();
		String out = gson.toJson(items);
		return out;
	}
	
	
}
