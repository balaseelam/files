package com.bloodbankmanagementsystem.main;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.Scanner;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


public class Demo {

	
	public static void main(String[] args) {

		Logger logger = LogManager.getLogger(Demo.class);
		logger.error("Hello");
		logger.info("Date");
		//String d=new Scanner(System.in).nextLine();
		java.sql.Date dt=new java.sql.Date(2001, 02, 2);
//		SimpleDateFormat df=new SimpleDateFormat("dd-MM-YYYY");
//		LocalDate date=LocalDate.of(25, 03, 2001);
//		logger.info(date);
		//String date="25-03-2001";
		logger.info(dt);
		
	}

}
