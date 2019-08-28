package com.framework.data.service;

import java.util.List;
import java.util.Optional;

public interface DataService {
	public UserInfo createUser(UserInfo userInfo);
	public List<UserInfo> findAllUser();
	public Optional<UserInfo> findUser(String userId);
	
}
