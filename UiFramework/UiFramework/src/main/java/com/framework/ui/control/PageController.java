package com.framework.ui.control;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import uap_clj.java.api.Browser;
import uap_clj.java.api.Device;
import uap_clj.java.api.OS;

@Controller
public class PageController {
	
	@GetMapping("/page/{pageId}.do")
	public String resolve(@PathVariable String pageId, Model model, HttpServletRequest req) {
		
		// user-Agent 파싱하여 Client Type 구하기
		model.addAttribute("deviceType", getDeviceType(req));
		model.addAttribute("osType", getOsType(req));
		model.addAttribute("browserType", getBrowserType(req));
		model.addAttribute("pageId", pageId);
		
		// 패널 정보 가져오기
		// TODO pageId에 해당하는 패널정보를 MetaDB에서 가져오기
		Map panelInfo = new HashMap();
		
		panelInfo.put("initpanel", "initpanel");  // init 패널 추가 (임시로 "initpanel" 세팅)
		
		List sPanelList = new ArrayList();
		sPanelList.add("subpanel1");              // 임시로 "subpanel1" 세팅
		sPanelList.add("subpanel2");              // 임시로 "subpanel2" 세팅
		panelInfo.put("spanel", sPanelList);	  // 정적 패널 List 추가
		
		model.addAttribute("panelInfo", panelInfo);
		
		return "template/pageTemplate";           // 템플릿 JSP 호출
		
	}

	private String getBrowserType(HttpServletRequest req) {
		String ua = req.getHeader("User-Agent");
        String browser = ((Map<String, String>) Browser.lookup(ua)).get("family").toUpperCase();
        System.out.println("browser:"+browser);
		return browser;
	}

	private String getOsType(HttpServletRequest req) {
		String ua = req.getHeader("User-Agent");
		String os = ((Map<String, String>) OS.lookup(ua)).get("family").toUpperCase();
		if(os.contains("WINDOWS")) {
			os="WINDOWS";
		}
         System.out.println("os:"+os);
		return os;
	}

	private String getDeviceType(HttpServletRequest req) {
		String ua = req.getHeader("User-Agent");
		String device = ((Map<String, String>) Device.lookup(ua)).get("family").toUpperCase();
		if("OTHER".equals(device)) {
			device="PC";
		}
        System.out.println("device:"+device);
		return device;
	}

}
