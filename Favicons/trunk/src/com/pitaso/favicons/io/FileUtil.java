package com.pitaso.favicons.io;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.logging.Logger;

import com.google.appengine.repackaged.org.apache.commons.logging.Log;
import com.google.appengine.repackaged.org.apache.commons.logging.LogFactory;
import com.pitaso.favicons.FaviconsServlet;

// TODO: Auto-generated Javadoc
/**
 * The Class FileUtil.
 */
public class FileUtil {

    /** The Constant LOG. */
    private static final Logger log = Logger.getLogger(FileUtil.class.getName());

    // Help function that reads the file from the disk into a String
    /**
     * Read file.
     * 
     * @param file the file
     * 
     * @return the string
     * 
     * @throws IOException Signals that an I/O exception has occurred.
     */
    public static String readFile(final File file) throws IOException {
	// File f = new File(fileName);
	final byte[] bytes = new byte[(int) file.length()];
	FileInputStream fis = null;
	try {
	    fis = new FileInputStream(file);
	    fis.read(bytes);
	} catch (final Exception e) {
	    try {
		if (fis != null) {
		    fis.close();
		}
	    } catch (final Exception e1) {
		log.severe("Error on close opened file");
	    }
	}
	return new String(bytes, "UTF-8");
    }

 

    /**
     * Read file.
     * 
     * @param name the name
     * 
     * @return the string
     * 
     * @throws IOException Signals that an I/O exception has occurred.
     */
    public static String readFile(final String name) throws IOException {
	final ClassLoader contextLoader = Thread.currentThread().getContextClassLoader();
	final InputStream inputstream = contextLoader.getResourceAsStream(name);
	return readFile(inputstream);
    }

    /**
     * Read file.
     * 
     * @param input the input
     * 
     * @return the string
     * 
     * @throws IOException Signals that an I/O exception has occurred.
     */
    public static String readFile(final InputStream input) throws IOException {
	final InputStreamReader inputstreamreader = new InputStreamReader(input);
	final BufferedReader bufferreader = new BufferedReader(inputstreamreader);
	final StringBuffer buffer = new StringBuffer();
	String line = null;
	while ((line = bufferreader.readLine()) != null) {
	    buffer.append(line).append("\n");
	}
	return buffer.toString();
	/*
	 * int bytesRead=0; int bytesToRead=1024; byte[] input = new
	 * byte[bytesToRead]; while (bytesRead < bytesToRead) { int result =
	 * is.read(input, bytesRead, bytesToRead - bytesRead); if (result == -1)
	 * break; bytesRead += result; } return new String(input, "UTF-8");
	 */
    }

    /**
     * Convert String to InputStream.
     * 
     * @param value the value
     * 
     * @return the input stream
     */
    public static InputStream convert(final String value) {
	InputStream inputstream = null;
	try {
	    inputstream = new ByteArrayInputStream(value.getBytes("UTF-8"));
	} catch (final UnsupportedEncodingException e) {
	    log.severe("Encoding unsupported on conversion");
	}
	return inputstream;
    }


    /**
     * Get a page from an url and returns a text response.
     * 
     * @param url the url
     * 
     * @return the string
     * 
     * @throws Exception      */
    public static String download(final String url) {
	final StringBuffer buffer = new StringBuffer();
	BufferedReader bufferreader = null;
	try {
	    final URL furl = new URL(url);
	    URLConnection conn=furl.openConnection();
	    bufferreader = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
	    String inputLine = null;
	    while ((inputLine = bufferreader.readLine()) != null) {
		buffer.append(inputLine);
	    }
	} catch (final Exception e) {
	    log.severe("Cannot download file "+url);
	} finally {
	    try {
		if (bufferreader != null) {
		    bufferreader.close();
		}
	    } catch (final Exception e) {
		log.severe("Cannot close input file");
	    }
	}
	return buffer.toString();
    }

    /**
     * Download.
     * 
     * @param url the url
     * 
     * @return the byte[]
     */
    public static byte[] download(final URL url) {
	byte[] data = null;

	try {
	    final URLConnection conn = url.openConnection();
	    final int contentLength = conn.getContentLength();

	    // String contentType = uc.getContentType();
	    if (contentLength == -1) {
		throw new IOException("No data behind this url : " + url.toString());
	    }
	    
	    int code = ((HttpURLConnection)conn).getResponseCode();
	    if (code>=400){
		throw new IOException("No data behind this url (http error "+code+") : " + url.toString());
	    }

	    /*
	     * if(contentType.startsWith("text/")) { throw new
	     * IOException("This is not a binary file."); }
	     */

	    final InputStream raw = conn.getInputStream();
	    final InputStream input = new BufferedInputStream(raw);
	    data = new byte[contentLength];
	    int bytesRead = 0;
	    int offset = 0;
	    while (offset < contentLength) {
		bytesRead = input.read(data, offset, data.length - offset);
		if (bytesRead == -1){
		    break;
		}
		offset += bytesRead;
	    }
	    input.close();

	    if (offset != contentLength) {
		throw new IOException("Only read " + offset + " bytes; Expected " + contentLength
			+ " bytes");
	    }
	} catch (IOException e) {
	    log.severe("download error for " + url);
	}

	return data;
    }


}
