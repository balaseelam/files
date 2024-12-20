package com.bloodbankmanagementsystem.controller;




import java.util.Objects;
import java.util.Scanner;

import org.apache.logging.log4j.LogManager;

import com.bloodbankmanagementsystem.model.User;
import com.bloodbankmanagementsystem.service.UserService;
import com.bloodbankmanagementsystem.service.UserServiceImpl;


public class UserController {
	
	static org.apache.logging.log4j.Logger log = LogManager.getLogger(UserController.class);
	
	private UserController() {}
	
	static Scanner sc=new Scanner(System.in);
	
	static String dec="*******************************************************";
	static String def="Select valid option";
	
	public static void user() {
		log.info(dec);
		log.info("************************* User *********************");
		log.info("1.Login\n2.Register\n3.Back");
		int n = sc.nextInt();
		switch(n) {
		case 1:
			log.info(dec);
			log.info("************************* User Login *********************");
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
		default:
			log.info(def);
			user();
			break;
		}
	}
	
	public static boolean userRegister() {
		boolean r=false;
		log.info(dec);
		log.info("************************* User Registration *********************");
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
		log.info("1.Male\n2.Female\n3.Others");
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
		default:
			log.info(def);
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


	public static User userLogin(String userMailId,String userPassword) {
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
	
	public static void userMenu(String id) {
		log.info(dec);
		log.info("************************* User Menu *********************");
		log.info("1.User Type\n2.Edit Profile\n3.View Profile\n4.Delete Profile\n5.Logout");
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
			userMenu(id);
			break;
		case 4:
			userDelete(id);
			break;
		case 5:
			log.info("Thank You");
			return;
		default:
			log.info(def);
			userMenu(id);
			break;	
		}
		
	}
	public static void userType(String id) {
		log.info(dec);
		log.info("************************* User Type *********************");
		log.info("1.Donate\n2.Request\n3.Back");
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
			userMenu(id);
			break;
		default:
			log.info(def);
			userType(id);
			break;
		}
	
	}
	
	public static void userModify(String id) {
		log.info(dec);
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
		log.info("1.Male\n2.Female\n3.Others");
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
		default:
			log.info(def);
			break;
		}
		log.info("Enter Contact Number to update");
		String contactNumber = sc.next();
		log.info("Enter password to update");
		String userPassword = sc.next();
		
		User user=new User(firstName,lastName,userMailId,bloodGroup,city,age,gender,contactNumber,userPassword); 
		
		
		log.info(UserServiceImpl.getInstance().userModify(user,id));
	}

	public static void userDelete(String id) {
		log.info(UserServiceImpl.getInstance().userDelete(id));
	}
	
	public static void userView(String id) {
		User u=UserServiceImpl.getInstance().getUser(id);
		log.info("First Name: {}\t\tLast Name: {}\t\tBlood Group: {}\t\tEmailId: {}\t\tCity: {}\t\tAge: {}\t\tGender: {}\t\tContact Number: {}\t\t",u.getFirstName(),u.getLastName(),u.getBloodGroup(),u.getMailId(),u.getCity(),u.getAge(),u.getGender(),u.getContactNumber());
	}
}
