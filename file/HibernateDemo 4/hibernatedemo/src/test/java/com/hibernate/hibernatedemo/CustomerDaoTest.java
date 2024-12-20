package com.hibernate.hibernatedemo;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.BeforeClass;
import org.junit.Test;

import com.hibernate.crud.Customer;
import com.hibernate.crud.CustomerDao;

public class CustomerDaoTest {
	
	 private static CustomerDao customerDao;

	    @BeforeClass
	    public static void setup() {
	        customerDao = new CustomerDao(); 
	    }

	    @Test
	    public void testSaveCustomer() {
	        Customer customer = new Customer();
	        customer.setCustId(1);
	        customer.setCustUserName("John Doe");
	        customer.setCustPhoneNo("1234567890");
	        customer.setCustEmail("johndoe@example.com");

	        customerDao.saveCustomer(customer);

	        
	        assertEquals(1, 1);
	        assertEquals("John Doe", customer.getCustUserName());
	        assertEquals("1234567890", customer.getCustPhoneNo());
	        assertEquals("johndoe@example.com", customer.getCustEmail());
	    }
	    @Test
	    public void testGetCustomerById() {
        Customer customer = customerDao.getCustomerById(1); 
	        assertEquals(1, customer.getCustId());
	        }
}