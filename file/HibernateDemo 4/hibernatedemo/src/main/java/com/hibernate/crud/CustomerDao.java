package com.hibernate.crud;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

public class CustomerDao {
	
	
	public void saveCustomer(Customer customer) {
		
		try(Session session = HibernateUtils.getSessionFactory().openSession()){
			Transaction transaction = session.beginTransaction();
	        session.merge(customer);
	        transaction.commit();
	        System.out.println("Customer created successfully!");
		}
		catch (Exception exception) {
			System.out.println(exception);
		}
		
	}
	
	public Customer getCustomerById(int id) {
		Customer customer = null;
		try(Session session = HibernateUtils.getSessionFactory().openSession()){
			session.beginTransaction();
			Query<Customer> query = session.createQuery("from Customer where custId=:id",Customer.class);
			query.setParameter("id", id);
			customer = query.getSingleResult(); 
			System.out.println(customer);
			session.getTransaction().commit();
		}catch(Exception exception) {
			System.out.println(exception);
		}
		return customer;
		
	}
	
	
	public void updateCustomerByName(String email,String name) {
		try (Session session = HibernateUtils.getSessionFactory().openSession()){
			session.beginTransaction();
			session.createQuery("update Customer set custEmail=:email where custUserName=:name")
			.setParameter("email", email)
			.setParameter("name", name)
			.executeUpdate();
			session.getTransaction().commit();
			} catch (Exception exception) {
				System.out.println(exception);
		}
	        
	}
	
	public void deleteCustomer(int id) {
		try (Session session = HibernateUtils.getSessionFactory().openSession()){	
			session.beginTransaction();
			session.createQuery("delete from Customer where custId=:id")
			.setParameter("id", id)
			.executeUpdate();
			session.getTransaction().commit();
			
		} catch (Exception exception) {
			System.out.println(exception);
		}
		
	}
	
	public List<Customer> getCustomers() {
		Session session = HibernateUtils.getSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();
        Query<Customer> query = session.createQuery("FROM Customer", Customer.class);
        List<Customer> customers = query.list();

        transaction.commit();
		return customers;
	}
	

}
