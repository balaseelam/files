package com.hibernate.crud;

import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;

public class HibernateUtils {

	
	private static final SessionFactory SESSION_FACTORY;
	
	static {
		Configuration con = new Configuration().configure().addAnnotatedClass(Employee.class);
		ServiceRegistry reg = new StandardServiceRegistryBuilder().applySettings(con.getProperties()).build();
		SESSION_FACTORY = con.buildSessionFactory(reg);
	}

	 public static SessionFactory getSessionFactory() {
		return SESSION_FACTORY;
	}
}
