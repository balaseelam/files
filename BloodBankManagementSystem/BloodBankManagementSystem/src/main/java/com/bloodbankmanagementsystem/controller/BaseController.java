package com.bloodbankmanagementsystem.controller;

import java.util.Scanner;

import org.apache.logging.log4j.LogManager;

import com.bloodbankmanagementsystem.main.MainTest;

public class BaseController {

static org.apache.logging.log4j.Logger log = LogManager.getLogger(MainTest.class);
	
	static Scanner sc  = new Scanner(System.in);
	
	public static void main(String[] args) {
		boolean f=true;

		do {
		AdminController adminController=new AdminController();
		UserController userController=new UserController();
		log.info("*******************************************************");
		log.info("welcome to BloodBankManagement");
		log.info("1.Admin");
		log.info("2.User");
		log.info("3.Exit");

		int n = sc.nextInt();
		switch(n) {
		case 1:
			log.info("Enter your mailId");
			String adminMailId = sc.next();
			log.info("Enter Your password");
			String adminPassword = sc.next();
			adminController.adminLogin(adminMailId,adminPassword);
			break;
		case 2:
			userController.user();
			break;
		case 3:
			f=false;
			log.info("Thank You");
			break;
		default:
			log.error("Invalid Input!!! \nPlease try again!!!!");
			break;
		}
		
		
		}while(f);
	}


	
}
