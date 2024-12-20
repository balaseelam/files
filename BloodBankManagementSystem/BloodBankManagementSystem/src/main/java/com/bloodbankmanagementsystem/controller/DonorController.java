package com.bloodbankmanagementsystem.controller;

import java.util.Scanner;

import org.apache.logging.log4j.LogManager;

public class DonorController {

	static org.apache.logging.log4j.Logger log = LogManager.getLogger(UserController.class);
	static Scanner sc=new Scanner(System.in);
	
	private DonorController() {}
	
	public static void donorAction(String id) {
		log.info("*******************************************************");
		log.info("************************* Donor *********************");
		log.info("1.Check Requesters");
		log.info("2.Donate Blood");
		log.info("3.Check Blood Availability");
		log.info("4.Back");
		int n = sc.nextInt();
		switch(n) {
		case 1:
			
			break;
		case 2:

			break;
		case 3:
			return;
		}
	}
}
