package com.bloodbankmanagementsystem.controller;

import java.util.Scanner;

import org.apache.logging.log4j.LogManager;

import com.bloodbankmanagementsystem.model.Requester;
import com.bloodbankmanagementsystem.service.RequesterService;
import com.bloodbankmanagementsystem.service.RequesterServiceImpl;

public class RequesterController {

	static org.apache.logging.log4j.Logger log = LogManager.getLogger(UserController.class);
	
	static Scanner sc=new Scanner(System.in);
	
	private RequesterController() {}
	
	public static void requesterAction(String id) {
		log.info("*******************************************************");
		log.info("************************* Requester *********************");
		log.info("1.Check Donors");
		log.info("2.Check Blood Availability");
		log.info("3.Request Blood");
		log.info("4.Back");
		int n = sc.nextInt();
		switch(n) {
		case 1:
			
			break;
		case 2:
			break;
		case 3:
			bloodRequest(id);
			break;
		case 4:
			return;
		}
	}
	
	public static void bloodRequest(String id) {
		log.info("*******************************************************");
		log.info("************************* Request Blood *********************");
		log.info("Enter Patient Name:");
		String patientName=sc.next();
		log.info("Enter Required BloodGroup:");
		String patientBloodGroup=sc.next();
		log.info("Enter Patient City:");
		String patientCity=sc.next();
		log.info("Enter Doctor Name:");
		String doctorName=sc.next();
		log.info("Enter Hospital Name:");
		String hospitalName=sc.next();
		log.info("Enter Hospital Address:");
		String hospitalAddress=sc.next();
		log.info("Enter Date: ");
		String date=sc.next();
		log.info("Enter Contact Name: ");
		String contactName=sc.next();
		log.info("Enter Contact Number: ");
		String contactNumber=sc.next();
		log.info("Enter Contact Email: ");
		String contactEmail=sc.next();
		log.info("Enter Message: ");
		String message=sc.next();
		log.info("Confirm Request: ");
		log.info("1.Yes");
		log.info("2.No");
		int n=sc.nextInt();
		String confirmation="";
		switch (n) {
		case 1:
			confirmation="Yes";
			break;
		case 2:
			confirmation="No";
			break;
		default:
			break;
		}
		if(confirmation=="Yes") {
			
			Requester requester=new Requester(patientName,patientBloodGroup,patientCity,doctorName,hospitalName,hospitalAddress,date,contactName,contactNumber,contactEmail,message,confirmation);
			requester.setStatus("pending");
			if(requester.getStatus().equals("pending")) {
				log.info(RequesterServiceImpl.getInstance().pendingStatus(requester,id));
			}
			if(RequesterServiceImpl.getInstance().request(requester,id)) {
				
			}	
		}
		else {
			return;
		}
		
		
	}
}
