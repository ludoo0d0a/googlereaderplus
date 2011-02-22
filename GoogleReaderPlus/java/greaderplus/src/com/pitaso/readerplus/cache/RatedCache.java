package com.pitaso.readerplus.cache;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.cache.Cache;
import javax.cache.CacheException;
import javax.cache.CacheFactory;
import javax.cache.CacheManager;

public class RatedCache {

	private static final Logger logger = Logger.getLogger(RatedCache.class.getName());
	
	private static final int LIMIT_CHARS = 800000; //800000chars ansi <1Mo (UTF8 not a lot)
	private static final String HEADER = "[[ratedcache";
	private Cache cache = null;
	
	private Cache getCache() {
		Map props = new HashMap();
		// props.put(GCacheFactory.EXPIRATION_DELTA, 3600);// 3600s 1h

		try {
			CacheFactory cacheFactory = CacheManager.getInstance()
					.getCacheFactory();
			cache = cacheFactory.createCache(props);
		} catch (CacheException e) {
			// ...
		}
		return cache;
	}
	
	public void put(String name, String value){
		if (cache==null){
			cache = getCache();
		}
		int size = value.length();
		String v = "";
		logger.log(Level.INFO, "Store "+name+" "+size);
		if(size<=LIMIT_CHARS){
			cache.put(name, value);
		}else{
			int count = size/LIMIT_CHARS;
			logger.log(Level.INFO, "Store "+name+" into "+count+" chunks");
			for (int j = 0; j <= count; j++) {
				int start = j*LIMIT_CHARS;
				int end = Math.min(size,start+LIMIT_CHARS);
				v = value.substring(start, end);
				cache.put(name+"_"+j, v);
				logger.log(Level.INFO, "Store "+name+"_"+j);
			}
			cache.put(name, HEADER+","+name+","+count);
			logger.log(Level.INFO, "Store "+name+" : "+HEADER+","+name+","+count);
		}
	}
	
	public String get(String name){
		String value = null;
		if (cache==null){
			cache = getCache();
		}
		logger.log(Level.INFO, "Get "+name);
		String v = (String) cache.get(name);
		if (v!=null && v.indexOf(HEADER)==0){
			logger.log(Level.INFO, "Chunks : "+v);
			StringBuffer sb = new StringBuffer();
			String[] segments = v.split(",");
			if (segments!=null && segments.length==3){
				String database = segments[1];
				logger.log(Level.INFO, "database : "+database);
				if (database.equals(name)){
					int count = Integer.parseInt(segments[2]);
					logger.log(Level.INFO, "count : "+count);
					for (int i = 0; i <= count; i++) {
						v = (String) cache.get(name+"_"+i);
						logger.log(Level.INFO, "read chunk  "+name+"_"+i);
						if (v!=null){
							sb.append(v);
						}
					}
				}
			}
			value = sb.toString();
		}else{
			logger.log(Level.INFO, "Full data");
			value=v;
		}
		return value;
	}
}
