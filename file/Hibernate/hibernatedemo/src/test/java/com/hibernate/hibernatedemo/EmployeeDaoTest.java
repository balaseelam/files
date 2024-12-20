package com.hibernate.hibernatedemo;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.BeforeClass;
import org.junit.Test;


import com.hibernate.crud.Employee;
import com.hibernate.crud.EmployeeDao;

public class EmployeeDaoTest {
	
	 private static EmployeeDao employeeDao;

	    @BeforeClass
	    public static void setup() {
	       employeeDao = new EmployeeDao(); 
	    }

	    @Test
	    public void testSaveCustomer() {
	        Employee employee = new Employee();
	        employee.setEmployeeId(1);
			employee.setEmployeeName("raj");
			employee.setEmployeeEmail("raj@email.com");
			employee.setEmployeePhoneNo("7878778787");

	        employeeDao.saveEmployee(employee);

	        
	        assertEquals(1, 1);
	        assertEquals("John Doe", employee.getEmployeeName());
	        assertEquals("1234567890", employee.getEmployeePhoneNo());
	        assertEquals("johndoe@example.com", employee.getEmployeeEmail());
	    }
	   
	    @Test
	    public void testGetCustomerByIdNotFound() {
	        Employee customer = employeeDao.getEmployeeById(100); // assuming customer with id 100 does not exist

	        assertNull(customer);
	    }

	  
	    @Test
	    public void testDeleteCustomer() {
	        employeeDao.deleteEmployee(1); // assuming customer with id 1 exists

	        Employee customer = employeeDao.getEmployeeById(1);
	        assertNull(customer);
	    }

	    @Test
	    public void testGetCustomers() {
	        List<Employee> employees = employeeDao.getEmployees();

	        assertNotNull(employees);
	        assertTrue(employees.size() > 0);

	        for (Employee employee : employees) {
	            assertNotNull(employee.getEmployeeId());
	            assertNotNull(employee.getEmployeeName());
	            assertNotNull(employee.getEmployeePhoneNo());
	            assertNotNull(employee.getEmployeeEmail());
	        }
	    }

}
