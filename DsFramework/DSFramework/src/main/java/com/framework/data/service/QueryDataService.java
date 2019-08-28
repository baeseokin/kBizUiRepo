package com.framework.data.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.framework.data.util.PerfLogging;

@Service
public class QueryDataService implements DataService{
	
	@Autowired
	private DataRepository dataRepository;
	
	@PerfLogging
	public UserInfo createUser(UserInfo userInfo) {
		UserInfo createUserInfo = dataRepository.save(userInfo);
		return createUserInfo;
	}
	
	@PerfLogging
	public List<UserInfo> findAllUser(){
		List userList = dataRepository.findAll();
		return userList;
	}

	@PerfLogging
	public Optional<UserInfo> findUser(String userId){
		Optional<UserInfo> userInfo = dataRepository.findById(userId);
		return userInfo;
	}	
	
}
