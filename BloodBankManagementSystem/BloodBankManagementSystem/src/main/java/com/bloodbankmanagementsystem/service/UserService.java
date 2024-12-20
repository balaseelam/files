package com.bloodbankmanagementsystem.service;

import com.bloodbankmanagementsystem.model.User;

public interface UserService {

	User userLogin(String userMailId, String userPassword);
	
	boolean userRegister(User user);
	
	String getUserId(String mailId);
	
	User getUser(String userId);

	String getType(String userMailId);

	 User userModify(User user,String id);
	 
	 String userDelete(String id);

	
}
