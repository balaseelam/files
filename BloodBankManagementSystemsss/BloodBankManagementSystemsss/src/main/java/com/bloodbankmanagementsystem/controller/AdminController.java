package com.bloodbankmanagementsystem.controller;


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Scanner;
import java.util.Set;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.bloodbankmanagementsystem.model.Approval;
import com.bloodbankmanagementsystem.model.Donor;
import com.bloodbankmanagementsystem.model.Requester;
import com.bloodbankmanagementsystem.service.AdminService;
import com.bloodbankmanagementsystem.service.AdminServiceImpl;

public class AdminController {
	
	private AdminController() {}
	
	static List<Requester> req=new ArrayList<>();
	static List<Donor> dnr=new ArrayList<>();
	
	public static Logger log = LogManager.getLogger(AdminController.class.getName());
	
	
	static AdminService adminService=AdminServiceImpl.getInstance();
	static Scanner sc=new Scanner(System.in);
	
	public static void adminLogin(String mailId,String pwd) {

			if(adminService.adminServiceLogin(mailId,pwd)) {
				adminHomePage();
			}
			else {
				log.warn("Not a Admin");
			}
			
		} 
	
	
	public static void adminHomePage() {
		log.info("Welcome\n1.Approval List\n2.Log Out");
		
		int choice = sc.nextInt();
		switch(choice){
		case 1:
			approve();
			
			break;
		case 2:
			log.info("Thank You");
			BaseController.main(null);
			break;
		default:
			log.error("Please Select Valid Option");
			break;
		}
		
	}
	
	public static void approve() {
		
		Set<Approval> l=approvalList();
		
		if(l.isEmpty()) {
			log.info("No pending Approvals");
			adminHomePage();
			return;
			
		}
		
		
		
		log.info("Select the option: ");
		log.info("1.Approve\n2.Reject\n3.Back");
		int ch=sc.nextInt();
		
		String id="";
		String status=" ";
		switch (ch) {
		case 1:
			status="Accepted";
			log.info("Enter id to approve: ");
			 id=sc.next();
			break;
		case 2:
			status="Rejected";
			log.info("Enter id to reject: ");
			 id=sc.next();

			break;
		case 3:
			adminHomePage();
			break;
		default:
			log.info("Select valid option");
			adminHomePage();
			break;
		}
		if(AdminServiceImpl.getInstance().changeStatus(id,status)!=null) {
		log.info(AdminServiceImpl.getInstance().changeStatus(id,status));
		}
		adminHomePage();
		
	}

	public static Set<Approval> approvalList() {
		
		Set<Approval> ap= adminService.approvalList();
		if(!ap.isEmpty()) {
			displayList(ap);
		}
		return ap;
	}
	
	public static void displayList(Set<Approval> list) {
		
		Iterator<Approval> i=list.iterator();
		log.info("*********************************************************************************************");
		while(i.hasNext()) {
			Approval s=i.next();
			log.info("Id: {}\t\tPatient Id: {}\t\tPatient Name: {}\t\tBlood Group: {}\t\tCity: {}\t\tDoctor Name: {}\t\tHospital Name: {}\t\tHospital Address: {}",s.getId(),s.getPatientId(),s.getPatientName(),s.getBloodGrouprequired(),s.getCity(),s.getDoctorName(),s.getHospitalName(),s.getHospitalAddress());
			
		}
		log.info("*********************************************************************************************");
		
		
		
	}
	
	
	

}
