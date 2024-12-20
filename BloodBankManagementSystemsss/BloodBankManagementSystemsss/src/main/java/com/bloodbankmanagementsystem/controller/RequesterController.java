package com.bloodbankmanagementsystem.controller;

import java.util.Iterator;
import java.util.List;
import java.util.Scanner;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.core.Logger;

import com.bloodbankmanagementsystem.model.Requester;
import com.bloodbankmanagementsystem.model.User;


import com.bloodbankmanagementsystem.service.RequesterServiceImpl;
import com.bloodbankmanagementsystem.service.UserServiceImpl;
import com.bloodbankmanagementsystem.utils.AppContext;

public class RequesterController {

	static org.apache.logging.log4j.Logger log = LogManager.getLogger(RequesterController.class);
	
	static Scanner sc=new Scanner(System.in);
	
	private RequesterController() {}
	
	public static void requesterAction(String id) {
		log.info("*******************************************************");
		log.info("************************* Requester *********************");
		log.info("1.Check Donors\n2.Request Blood\n3.Back");
		int n = sc.nextInt();
		switch(n) {
		case 1:

			checkDonors(id);
			requesterAction(id);
			break;
		case 2:
			bloodRequest(id);
			break;
		case 3:
			UserController.userType(id);
			break;
		default:
			log.info("Select valid option");
			UserController.userType(id);
			break;
		}
	}
	
	public static List<User> checkDonors(String id) {
		User u=UserServiceImpl.getInstance().getUser(id);
		List<User> l=	RequesterServiceImpl.getInstance().checkDonors(u);
		if(!l.isEmpty()) {
			displayList(l);
		}
			return l;		
	}

	private static void displayList(List<User> l) {
		Iterator<User> i=l.iterator();
		int j=1;
		log.info("*********************************************************************************************");
		
		while(i.hasNext()) {
			User u=i.next();
			log.info("Id: {}\t\tDonor Id: {}\t\tFirst Name: {}\t\tLast Name: {}\t\tBlood Group: {}\t\tEmailId: {}\t\tCity: {}\t\tAge: {}\t\tGender: {}\t\tContact Number: {}",j,u.getUserId(),u.getFirstName(),u.getLastName(),u.getBloodGroup(),u.getMailId(),u.getCity(),u.getAge(),u.getGender(),u.getContactNumber());
			j++;
		}
		log.info("*********************************************************************************************");
		
		
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
		String doctorName="Dr."+sc.next();
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
		log.info("1.Yes\n2.No");
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
			log.info("Select valid option");
			requesterAction(id);
			break;
		}
		if(confirmation.equals("Yes")) {
			
			Requester requester=AppContext.getInstance().getBean("Requester");
			requester.setPatientName(patientName);
			requester.setBloodGrouprequired(patientBloodGroup);
			requester.setCity(patientCity);
			requester.setDoctorName(doctorName);
			requester.setHospitalName(hospitalName);
			requester.setHospitalAddress(hospitalAddress);
			requester.setDate(date);
			requester.setContactName(contactName);
			requester.setContactNumber(contactNumber);
			requester.setContactEmail(contactEmail);
			requester.setMessage(message);
			requester.setConfirmation(confirmation);
			requester.setStatus("pending");
			requester.setDonorStatus("pending");
				Requester r=RequesterServiceImpl.getInstance().pendingStatus(requester,id);
				if(r!=null) {
					log.info("Request Successfull ");
				}
				else {
					log.info("Request failed");
				}
				requesterAction(id);
			
		}
		else if(confirmation.equals("No")){
			requesterAction(id);
		}
		
		
	}
}
