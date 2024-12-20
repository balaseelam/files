package com.bloodbankmanagementsystem.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Objects;
import java.util.Scanner;

import org.apache.logging.log4j.LogManager;

import com.bloodbankmanagementsystem.dao.BloodBankManagementSystemDao;
import com.bloodbankmanagementsystem.model.User;
import com.bloodbankmanagementsystem.service.UserService;
import com.bloodbankmanagementsystem.service.UserServiceImpl;
import com.bloodbankmanagementsystem.utils.AppContext;

public class UserController {
	
	static org.apache.logging.log4j.Logger log = LogManager.getLogger(UserController.class);
	
	
	Scanner sc=new Scanner(System.in);
	
	
	public void user() {
		log.info("*******************************************************");
		log.info("*************************User*********************");
		log.info("1.Login");
		log.info("2.Register");
		log.info("3.Back");
		int n = sc.nextInt();
		switch(n) {
		case 1:
			log.info("*******************************************************");
			log.info("*************************User Login*********************");
			log.info("Enter your mailId");
			String userMailId = sc.next();
			log.info("Enter Your password");
			String userPassword = sc.next();
			
			User user = userLogin(userMailId,userPassword);
			if(user!=null) {
				userMenu(user.getUserId());
			}

			
			break;
		
		case 2:
			if(userRegister()) {
				log.info("Registration Successfull");
			}
			else{
				log.error("Registration Unsuccessfull enter valid details");
			}
			break;
		case 3:
			return;
			
		}
	}
	
	private boolean userRegister() {
		boolean r=false;
		log.info("*******************************************************");
		log.info("*************************User Registration*********************");
		log.info("Enter your First Name: ");
		String firstName = sc.next();
		log.info("Enter Your Last Name: ");
		String lastName = sc.next();
		log.info("Enter your Email Id");
		String userMailId = sc.next();
		log.info("Enter Your Blood Group");
		String bloodGroup = sc.next();
		log.info("Enter your City");
		String city = sc.next();
		log.info("Enter Your Age");
		int age = sc.nextInt();
		log.info("Select Gender");
		log.info("1.Male");
		log.info("2.Female");
		log.info("3.Others");
		int i = sc.nextInt();
		String gender="";
		switch(i) {
		case 1:
			gender="Male";
			break;
		case 2:
			gender="Female";
			break;
		case 3:
			gender="Others";
			break;
		}
		log.info("Enter your Contact Number");
		String contactNumber = sc.next();
		log.info("Enter Your password");
		String userPassword = sc.next();
		User user=new User(firstName,lastName,userMailId,bloodGroup,city,age,gender,contactNumber,userPassword); 
		if(UserServiceImpl.getInstance().userRegister(user)) {
			r=true;
		}
		return r;
	}


	public User userLogin(String userMailId,String userPassword) {
		UserService userService=UserServiceImpl.getInstance();
		User user=userService.userLogin(userMailId, userPassword);
		if(user!=null) {
			if(user.getType()!=null && Objects.equals(user.getType(), "U")) {
				return user;
			}
			
		}
		else {
			log.error("Invalid Credentials!!!!!!!!");
		}
		return null;
		}
	
	public void userMenu(String id) {
		log.info("*******************************************************");
		log.info("************************* User Menu *********************");
		log.info("1.User Type");
		log.info("2.Edit Profile");
		log.info("3.View Profile");
		log.info("4.Delete Profile");
		log.info("5.Logout");
		log.info("Select option from menu:");
		int n=sc.nextInt();
		switch(n) {
		case 1:
			userType(id);
			break;
		case 2:
			userModify(id);
			break;
		case 3:
			userView(id);
			break;
		case 4:
			userDelete(id);
			break;
		case 5:
			log.info("Thank You");
			return;
			
		}
		
	}
	public void userType(String id) {
		log.info("*******************************************************");
		log.info("************************* User Type *********************");
		log.info("1.Donate");
		log.info("2.Request");
		log.info("3.Back");
		log.info("Select type of user:");
		int n = sc.nextInt();
		switch(n) {
		case 1:
			DonorController.donorAction(id);
			break;
		case 2:
			RequesterController.requesterAction(id);
			break;

		case 3:
			log.info("Thank You");
			return;
		}
	
	}
	
	public void userModify(String id) {
		log.info("*******************************************************");
		log.info("************************* User Update *********************");
		log.info("Enter First Name to update: ");
		String firstName = sc.next();
		log.info("Enter Last Name to update: ");
		String lastName = sc.next();
		log.info("Enter Email Id to update");
		String userMailId = sc.next();
		log.info("Enter Blood Group to update");
		String bloodGroup = sc.next();
		log.info("Enter City to update");
		String city = sc.next();
		log.info("Enter Age to update");
		int age = sc.nextInt();
		log.info("Select Gender to update:");
		log.info("1.Male");
		log.info("2.Female");
		log.info("3.Others");
		int i = sc.nextInt();
		String gender="";
		switch(i) {
		case 1:
			gender="Male";
			break;
		case 2:
			gender="Female";
			break;
		case 3:
			gender="Others";
			break;
		}
		log.info("Enter Contact Number to update");
		String contactNumber = sc.next();
		log.info("Enter password to update");
		String userPassword = sc.next();
		
		User user=new User(firstName,lastName,userMailId,bloodGroup,city,age,gender,contactNumber,userPassword); 
		
		
		log.info(UserServiceImpl.getInstance().userModify(user,id));
	}

	public void userDelete(String id) {
		log.info(UserServiceImpl.getInstance().userDelete(id));
	}
	
	public void userView(String id) {
		log.info(UserServiceImpl.getInstance().getUser(id));
	}
}
