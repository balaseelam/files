package com.hibernate.crud;

import java.util.List;


import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import com.hibernate.entity.Employee;

public class EmployeeDao {
	
	
	public void saveEmployee(Employee employee) {
		
		try(Session session = HibernateUtils.getSessionFactory().openSession()){
			Transaction transaction = session.beginTransaction();
	        session.persist(employee);
	        transaction.commit();
	        System.out.println("Employee created successfully!");
		}
		catch (Exception exception) {
			System.out.println(exception);
		}
		
	}
	
	public Employee getEmployeeById(int id) {
		Employee employee = null;
		try(Session session = HibernateUtils.getSessionFactory().openSession()){
			session.beginTransaction();
			Query<Employee> query = session.createQuery("from Employee where employeeId=:id",Employee.class);
			query.setParameter("id", id);
			employee = query.getSingleResult(); 
			System.out.println(employee);
			session.getTransaction().commit();
		}catch(Exception exception) {
			System.out.println(exception);
		}
		return employee;
		
	}
	
	public void updateEmployeeByName(String email,String name) {
		try (Session session = HibernateUtils.getSessionFactory().openSession()){
			session.beginTransaction();
			session.createQuery("update Employee set employeeEmail=:email where employeeName=:name")
			.setParameter("email", email)
			.setParameter("name", name)
			.executeUpdate();
			session.getTransaction().commit();
			} catch (Exception exception) {
				System.out.println(exception);
		}
	        
	}
	
	public void deleteEmployee(int id) {
		try (Session session = HibernateUtils.getSessionFactory().openSession()){	
			session.beginTransaction();
			session.createQuery("delete from Employee where employeeId=:id")
			.setParameter("id", id)
			.executeUpdate();
			session.getTransaction().commit();
			
		} catch (Exception exception) {
			System.out.println(exception);
		}
		
	}
	
	public List<Employee> getEmployees() {
		Session session = HibernateUtils.getSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();
        Query<Employee> query = session.createQuery("FROM Employee", Employee.class);
        List<Employee> employees = query.list();

        transaction.commit();
		return employees;
	}
	

}
