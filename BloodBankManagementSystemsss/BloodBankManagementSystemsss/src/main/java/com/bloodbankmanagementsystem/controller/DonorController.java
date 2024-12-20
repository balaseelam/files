package com.bloodbankmanagementsystem.controller;

import java.util.Iterator;
import java.util.List;
import java.util.Scanner;

import org.apache.logging.log4j.LogManager;

import com.bloodbankmanagementsystem.dao.RequesterDao;
import com.bloodbankmanagementsystem.model.Donor;
import com.bloodbankmanagementsystem.model.Requester;

import com.bloodbankmanagementsystem.model.User;
import com.bloodbankmanagementsystem.service.DonorServiceImpl;
import com.bloodbankmanagementsystem.service.UserServiceImpl;
import com.bloodbankmanagementsystem.utils.AppContext;

public class DonorController {

	static org.apache.logging.log4j.Logger log = LogManager.getLogger(DonorController.class);
	static Scanner sc=new Scanner(System.in);
	
	private DonorController() {}
	
	public static void donorAction(String id) {
		log.info("*******************************************************");
		log.info("************************* Donor *********************");
		log.info("1.Check Requesters\n2.Donate Blood\n3.Back");
		int n = sc.nextInt();
		switch(n) {
		case 1:

			checkRequesters(id);
			donorAction(id);
			break;
		case 2:
			donateBlood(id);
			donorAction(id);
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
	
	private static void donateBlood(String id) {
		List<Requester> l=checkRequesters(id);
		if(l.isEmpty()) {
			log.info("No requesters nearest to you");
			return;
		}
		log.info("Enter Id to donate: ");
		String reqId=sc.next();
		log.info("Enter glucose level: ");
		int glucoseLevel=sc.nextInt();
		log.info("Enter message: ");
		String msg=sc.next();
		log.info("1.Donate\n2.Cancel");
		int ch=sc.nextInt();
		String confirm=" ";
		String status=" ";
		switch (ch) {
		case 1:
			confirm="yes";
			status="pending";
			
			break;
		case 2:
			donorAction(id);
			break;
		default:
			log.info("Select valid option");
			break;
		}
		
		if(confirm.equals("yes")&&status.equals("pending")) {
			Donor donor=AppContext.getInstance().getBean("Donor");
			String rId=RequesterDao.getInstance().getRequesterDetails(reqId);
			donor.setPatientId(rId);
			donor.setGlucoseLevel(glucoseLevel);
			donor.setNotes(msg);
			donor.setConfirmation(confirm);
			donor.setStatus(status);
			Donor d=DonorServiceImpl.getInstance().pendingDonor(donor,id,reqId);
			if(d!=null) {
				log.info("Donation Successfull ");
			}
			else {
				log.info("Donation failed");
				
			}
		}
		
		
		
	}

	public static List<Requester> checkRequesters(String id) {
		User u=UserServiceImpl.getInstance().getUser(id);
	List<Requester> l=	DonorServiceImpl.getInstance().checkRequesters(u);
	
	if(!l.isEmpty()) {
		displayList(l);
	}
		return l;		
	}

	
public static void displayList(List<Requester> list) {
		
		Iterator<Requester> i=list.iterator();
		log.info("*********************************************************************************************");
		
		while(i.hasNext()) {
			Requester s=i.next();
			log.info("Id: {}\t\tRequester Id: {}\t\tPatient Name: {}\t\tBlood Group: {}\t\tCity: {}\t\tDoctor Name: {}\t\tHospital Name: {}\t\tHospital Address: {}\t\tDate: {}\t\tContact Name: {}\t\tContact Number: {}\t\tContact Email: {}\t\tMessage",s.getId(),s.getRequesterId(),s.getPatientName(),s.getBloodGrouprequired(),s.getCity(),s.getDoctorName(),s.getHospitalName(),s.getHospitalAddress(),s.getDate(),s.getContactName(),s.getContactNumber(),s.getContactEmail(),s.getMessage());
			
		}
		log.info("*********************************************************************************************");
		
		
	}
}
