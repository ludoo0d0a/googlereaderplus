package com.pitaso.favicons.service;

import javax.jdo.PersistenceManager;

import com.google.appengine.repackaged.org.apache.commons.logging.Log;
import com.google.appengine.repackaged.org.apache.commons.logging.LogFactory;
import com.pitaso.favicons.jdo.PMF;
import com.pitaso.favicons.pojo.Icon;

public class IconService {

    private static final Log LOG = LogFactory.getLog(IconService.class);;
    
    public Icon get(String url){
	PersistenceManager pm =null;
	Icon icon = null;
	try {
	    pm = PMF.get().getPersistenceManager();
	    icon = pm.getObjectById(Icon.class, url);
	} catch (Exception e) {
	    LOG.error(e);
	}finally{
	    if (pm!=null){
		pm.close();
	    }
	}
	return icon;
    }
    
    public void save(String url, String icon){
	if (icon!=null){
    		Icon o=new Icon(url, icon);
    		save(o);
	}
    }
    
    public String getIcon(String url){
	String icon =null;
	Icon o=get(url);
	if (o!=null){
	    icon = o.getIcon();
	}
	return icon;
    }
    
    public void save(Icon icon){
	PersistenceManager pm =null;
	try {
	    pm.makePersistent(icon);
	} catch (Exception e) {
	    LOG.error(e);
	}finally{
	    if (pm!=null){
		pm.close();
	    }
	}
	
    }
}
