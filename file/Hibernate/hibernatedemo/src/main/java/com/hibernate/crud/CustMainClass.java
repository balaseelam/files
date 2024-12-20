package com.hibernate.crud;

import java.util.List;


import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.hibernate.entity.Employee;

public class CustMainClass {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
        ApplicationContext context = new AnnotationConfigApplicationContext(Config.class);
        Employee employee = context.getBean(Employee.class);
       // System.out.println(customer);
        
        
		
        employee.setEmployeeId(1);
		employee.setEmployeeName("raj");
		employee.setEmployeeEmail("raj@email.com");
		employee.setEmployeePhoneNo("7878778787");
	
		
		
		EmployeeDao dao = new EmployeeDao();
		
	    dao.saveEmployee(employee);
		
		//dao.getCustomerById(52);
		
		//dao.deleteCustomer(52);
		 
		//dao.updateCustomerByName("madhu@gmail.com", "madhu");

		
		List<Employee> employees =dao.getEmployees();
        for (Employee employee1 : employees) {
        	System.out.println(employee1.toString());
        //System.out.println(employee1.getEmployeeId() + " " + employee1.getEmployeeName() + " " + employee1.getEmployeePhoneNo() + " " + employee1.getEmployeeEmail());
  }

	}

}
