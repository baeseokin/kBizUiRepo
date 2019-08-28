package com.framework.data.control;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParser;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.framework.data.service.DataRepository;
import com.framework.data.service.DataService;
import com.framework.data.service.QueryDataService;
import com.framework.data.service.UserInfo;
import com.framework.data.vo.DataSet;


@RestController
@CrossOrigin(origins = "http://localhost:8080", maxAge = 3600)
@RequestMapping("/data")
public class DataController {
	
	
	@Autowired
	DataService dataService;

	@PostMapping("/{tranId}.do")	
	public ResponseEntity<String> execute(@PathVariable String tranId, @RequestBody Map<String, Object> payload) {
		
		System.out.println("tranid:"+ tranId);
		System.out.println("payload.params:"+ payload.get("params"));

		JSONParser jsonParser = new JSONParser();
		JSONObject jsonObject = null;
		try {
			jsonObject = (JSONObject) jsonParser.parse((String) payload.get("params"));
		} catch (ParseException e) {
			e.printStackTrace();
		}

		String returnJSON = "";
		
		/* TODO 1.tranId를 파싱하여 ServiceType 분기처리
				  ※ 화면에서 연계가능한 모든 유형을 tranID에서 파싱하여 분기 예)EJB, SQL, POJO, RFC 등등등
				  ※ 아래 샘플에는 internal Service Type인 POJO 만 구현함.
		*/
		if("createUser".equals(tranId)) {
			UserInfo userInfo = new UserInfo();
			userInfo.setUserId((String)jsonObject.get("userId"));
			userInfo.setUsername((String)jsonObject.get("username"));
			userInfo.setAge((String)jsonObject.get("age"));
			
			UserInfo createUserInfo = dataService.createUser(userInfo);
			
			ObjectMapper mapper = new ObjectMapper();
			String createUserInfoJSON = null;
			try {
				createUserInfoJSON = mapper.writeValueAsString(createUserInfo);
			} catch (JsonProcessingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			returnJSON= createUserInfoJSON;

		}else if("findAllUser".equals(tranId)) {
			UserInfo userInfo = new UserInfo();
			List list = dataService.findAllUser();
			
			ObjectMapper mapper = new ObjectMapper();
			String allUserInfoJSON = null;
			try {
				allUserInfoJSON = mapper.writeValueAsString(list);
			} catch (JsonProcessingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			returnJSON = allUserInfoJSON;
			
		}else if("findUser".equals(tranId)) {
			Optional<UserInfo> userInfo = dataService.findUser((String)jsonObject.get("userId"));
			List list = new ArrayList();
			list.add(userInfo.get());
			
			System.out.println("findUser  -- list:"+ list);
			ObjectMapper mapper = new ObjectMapper();
			String userInfoJSON = null;
			try {
				userInfoJSON = mapper.writeValueAsString(list);
			} catch (JsonProcessingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			returnJSON = userInfoJSON;
		}
		
		System.out.println("returnJSON:"+ returnJSON);
		return ResponseEntity.ok(returnJSON);
	}
}
