package com.pitaso.readerplus.service;

import java.lang.reflect.Type;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.pitaso.readerplus.pojo.ItemFavicons;

public class FaviconsServlet extends AbstractWeDataServlet{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -7707518043701502765L;
	
	private static final String KEY_REPLACER = "favicons";
	private static final String DATABASE = "Favicons";
	
	@Override
	public String getDatabase() {
		return DATABASE;
	}
	
	@Override
	public String getKey() {
		return KEY_REPLACER;
	}
	
	@Override
	public String compactJson(String json) {
		Type listType = new TypeToken<List<ItemFavicons>>() {}.getType();
		List<ItemFavicons> items = new Gson().fromJson(json, listType);
		
		//Gson gson = new GsonBuilder().setPrettyPrinting().create();
		Gson gson = new GsonBuilder().create();
		String out = gson.toJson(items);
		return out;
	}
	
}
