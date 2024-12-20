package com.bloodbankmanagementsystem.service;

import com.bloodbankmanagementsystem.dao.UserDao;
import com.bloodbankmanagementsystem.model.User;

public class UserServiceImpl implements UserService {
	
	public static UserServiceImpl userService=null;
	
	
	public static UserService getInstance() {
		if(userService==null) {
			userService= new UserServiceImpl();
		}
		return userService;
	}
	
	public String getEmail(String mailId)
	{
		return UserDao.getInstance().getEmail(mailId);
		
	}
	
	public User userLogin(String mailId,String password)
	{
		return UserDao.getInstance().userDaoLogin(mailId, password);
		
	}

	@Override
	public boolean userRegister(User user) {
		return UserDao.getInstance().register(user);
	}

	@Override
	public User getUser(String userId) {
		return UserDao.getInstance().getUser(userId);
	}

	@Override
	public String getUserId(String mailId) {

		return UserDao.getInstance().getUserId(mailId);
	}

	@Override
	public String getType(String userMailId) {
		return UserDao.getInstance().getType(userMailId);
	}

	@Override
	public User userModify(User user,String id) {
		
		return UserDao.getInstance().modifyUser(user,id);
	}

	@Override
	public String userDelete(String id) {
		return UserDao.getInstance().deleteUser(id);
	}


	
}
