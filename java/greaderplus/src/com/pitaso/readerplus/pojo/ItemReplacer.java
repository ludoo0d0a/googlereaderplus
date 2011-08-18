package com.pitaso.readerplus.pojo;

public class ItemReplacer implements Item{

	private String name;
	private DataReplacer data;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public DataReplacer getData() {
		return data;
	}
	public void setData(DataReplacer data) {
		this.data = data;
	}
	
	
}
