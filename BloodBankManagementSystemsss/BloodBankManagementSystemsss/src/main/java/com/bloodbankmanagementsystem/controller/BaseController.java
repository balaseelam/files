package com.bloodbankmanagementsystem.controller;

import java.util.Scanner;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


public class BaseController {

	public static Logger log  = LogManager.getLogger(BaseController.class.getName());	
	static Scanner sc  = new Scanner(System.in);
	
	public static void main(String[] args) {
		boolean f=true;

		do {
		log.info("*******************************************************");
		log.info("Welcome to Blood Bank Management System\n1.Admin\n2.User\n3.Exit");

		int n = sc.nextInt();
		switch(n) {
		case 1:
			log.info("Enter your mailId");
			String adminMailId = sc.next();
			log.info("Enter Your password");
			String adminPassword = sc.next();
			AdminController.adminLogin(adminMailId,adminPassword);
			break;
		case 2:
			UserController.user();
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
