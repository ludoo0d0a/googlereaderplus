package com.pitaso.favicons;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;

import com.google.appengine.api.quota.QuotaService;
import com.google.appengine.api.quota.QuotaServiceFactory;
import com.pitaso.favicons.service.IconService;

public class StatisticsServlet extends HttpServlet {

    private static final long serialVersionUID = -2567090715648047805L;
    private static final Logger log = Logger.getLogger(StatisticsServlet.class.getName());

    public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
	doAction(req, resp);
    }
/*
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
	doAction(req, resp);
    }
*/
    
    public void doAction(HttpServletRequest req, HttpServletResponse resp) throws IOException {
	Map<String, Object> stats = new HashMap<String, Object>();
	
	addIconsCount(stats);
	ObjectMapper mapper = new ObjectMapper();
	mapper.writeValue(resp.getOutputStream(), stats);
    }
    
    private void addIconsCount(Map<String, Object> stats){
	QuotaService qs = QuotaServiceFactory.getQuotaService();
        long start = qs.getCpuTimeInMegaCycles();
        
        IconService iconService = new IconService();
        stats.put("count", iconService.getCount());
        
        long end = qs.getCpuTimeInMegaCycles();
        double cpuSeconds = qs.convertMegacyclesToCpuSeconds(end - start);
        stats.put("cpu", cpuSeconds);
        
    }
}
