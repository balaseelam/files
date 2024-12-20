package com.hibernate.crud;

import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class CustMainClass {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
        ApplicationContext context = new AnnotationConfigApplicationContext(Config.class);
        Customer customer = context.getBean(Customer.class);
        //System.out.println(customer);
		
        //customer.setCustId(3);
		customer.setCustUserName("Narayana");
		customer.setCustEmail("narayana@gmail.com");
		customer.setCustPhoneNo("9010100234");
		
		CustomerDao dao = new CustomerDao();
		
	  dao.saveCustomer(customer);
		
		//dao.getCustomerById(2);
		
		//dao.deleteCustomer(3);
		 
		//dao.updateCustomerByName("bala21@gmail.com", "bala");

		
	    List<Customer> customers =dao.getCustomers();
       for (Customer customer1 : customers) {
        System.out.println(customer1.getCustId() + " " + customer1.getCustUserName() + " " + customer1.getCustPhoneNo() + " " + customer1.getCustEmail());
  }

	}

}
