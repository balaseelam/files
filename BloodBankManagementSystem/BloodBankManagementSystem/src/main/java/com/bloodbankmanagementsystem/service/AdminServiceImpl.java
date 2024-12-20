package com.bloodbankmanagementsystem.service;

import java.util.Scanner;

import com.bloodbankmanagementsystem.dao.AdminDao;



public class AdminServiceImpl {
	AdminDao dao=new AdminDao();
	public boolean adminServiceLogin(String mailId,String password)
	{
		return dao.adminDaoLogin(mailId, password);
		
	}
}
