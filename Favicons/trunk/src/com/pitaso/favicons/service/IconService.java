package com.pitaso.favicons.service;

import java.util.List;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;

import com.pitaso.favicons.jdo.PMF;
import com.pitaso.favicons.pojo.Icon;

public class IconService {

    private static final Logger log = Logger.getLogger(IconService.class.getName());

    public Icon get(String url) {
	PersistenceManager pm = null;
	Icon icon = null;
	try {
	    pm = PMF.get().getPersistenceManager();
	    icon = pm.getObjectById(Icon.class, url);
	} catch (Exception e) {
	    log.warning(e.getMessage());
	} finally {
	    if (pm != null) {
		pm.close();
	    }
	}
	return icon;
    }

    public List<Icon> getAll(List<String> urls) {
	PersistenceManager pm = null;
	List<Icon> icons = null;
	try {
	    pm = PMF.get().getPersistenceManager();
	    icons = (List<Icon>) pm.getObjectsById(urls);
	} catch (Exception e) {
	    log.warning(e.getMessage());
	} finally {
	    if (pm != null) {
		pm.close();
	    }
	}
	return icons;
    }

    public void save(Icon icon) {
	PersistenceManager pm = null;
	try {
	    pm = PMF.get().getPersistenceManager();
	    pm.makePersistent(icon);
	    log.info("Saved");
	} catch (Exception e) {
	    log.severe("Not saved: " + e.getMessage());
	} finally {
	    if (pm != null) {
		pm.close();
	    }
	}
    }
    
    public void update(String url, String icon) {
	PersistenceManager pm = null;
	try {
	    pm = PMF.get().getPersistenceManager();
	    Icon o = pm.getObjectById(Icon.class, url);
	    if (o!=null){
		o.setIcon(icon);
	    }else{
		//save it 
		save(url, icon);
	    }
	} catch (Exception e) {
	    log.severe("Not saved: " + e.getMessage());
	} finally {
	    if (pm != null) {
		pm.close();
	    }
	}
    }

    public void delete(Icon icon) {
	PersistenceManager pm = null;
	try {
	    pm = PMF.get().getPersistenceManager();
	    pm.deletePersistent(icon);
	    log.info("Deleted");
	} catch (Exception e) {
	    log.severe("Not deleted: " + e.getMessage());
	} finally {
	    if (pm != null) {
		pm.close();
	    }
	}
    }

    public void deleteAll(List<Icon> icons) {
	PersistenceManager pm = null;
	try {
	    pm = PMF.get().getPersistenceManager();
	    pm.deletePersistentAll(icons);
	    log.info("Deleted all");
	} catch (Exception e) {
	    log.severe("Not deleted: " + e.getMessage());
	} finally {
	    if (pm != null) {
		pm.close();
	    }
	}
    }

    public void save(String url, String icon) {
	if (icon != null) {
	    Icon o = new Icon(url, icon);
	    save(o);
	}
    }

    public String getIcon(String url) {
	String icon = null;
	Icon o = get(url);
	if (o != null) {
	    icon = o.getIcon();
	}
	return icon;
    }
}
