package com.pitaso.readerplus.service;

import java.lang.reflect.Type;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.pitaso.readerplus.pojo.ItemReplacer;

public class ReplacerServlet extends AbstractWeDataServlet{

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
	/*
	@Override
	public String getKey() {
		return KEY_REPLACER;
	}*/
	
	@Override
	public String compactJson(String json) {
		Type listType = new TypeToken<List<ItemReplacer>>() {}.getType();
		List<ItemReplacer> items = new Gson().fromJson(json, listType);
		
		int i=0;
		for (ItemReplacer item : items) {
			item.setName(""+(++i));
		}
		
		//Gson gson = new GsonBuilder().setPrettyPrinting().create();
		Gson gson = new GsonBuilder().create();
		String out = gson.toJson(items);
		return out;
	}
	
	
}
