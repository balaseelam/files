package com.bloodbankmanagementsystem.controller;

import java.util.Scanner;

import org.apache.logging.log4j.LogManager;

import com.bloodbankmanagementsystem.service.AdminServiceImpl;

public class AdminController {
	
	static org.apache.logging.log4j.Logger log = LogManager.getLogger(AdminController.class);
	
	
	AdminServiceImpl adminService=new AdminServiceImpl();
	Scanner sc=new Scanner(System.in);
	
	public void adminLogin(String mailId,String pwd) {

			if(adminService.adminServiceLogin(mailId,pwd)) {
				adminHomePage();
			}
			
			
		} 
	
	
	public void adminHomePage() {
		log.info("Welcome ");
		log.info("1.Check Blood Availability");
		log.info("2.Donor/Requester Approval List");
		log.info("3.Donors List");
		log.info("4.Log Out");
		int choice = sc.nextInt();
		switch(choice){
		case 1:
			
			  break;
		case 2:
			
			  break;
		case 3:
			  break;
		case 4:
			log.info("Thank You");
			return;
		default:
			log.error("Please Select Valid Option");	
		}
	}

}
