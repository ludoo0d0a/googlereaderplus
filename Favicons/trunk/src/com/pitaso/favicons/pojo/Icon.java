package com.pitaso.favicons.pojo;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

/**
 * 
 * @author Valente
 * 
 * http://googleappengine.blogspot.com/2009/12/jpajdo-java-persistence-tips-year-in.html
 * http://gae-java-persistence.blogspot.com/
 *
 */
@PersistenceCapable
public class Icon {

    @PrimaryKey
    private String url = null;
    
    @Persistent
    private String icon = null;

    public Icon(String url, String icon) {
	this.url = url;
	this.icon = icon;
    }
    public void setIcon(String icon) {
	this.icon = icon;
    }
    public String getIcon() {
	return icon;
    }
    
    public void setUrl(String url) {
	this.url = url;
    }
    public String getUrl() {
	return url;
    }
    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
	StringBuffer sb = new StringBuffer("[Icon]");
	sb.append(" url:").append(url);
	sb.append(" icon:").append(icon);
	return sb.toString();
    }
    
}
