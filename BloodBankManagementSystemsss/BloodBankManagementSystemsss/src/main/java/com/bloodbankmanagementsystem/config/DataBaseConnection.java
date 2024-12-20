package com.bloodbankmanagementsystem.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.apache.logging.log4j.LogManager;



public class DataBaseConnection {
	
	private DataBaseConnection() {}
	static org.apache.logging.log4j.Logger log = LogManager.getLogger(DataBaseConnection.class);
	
	public static Connection getConnection(){
		try
		{
		Class.forName("com.mysql.cj.jdbc.Driver");
		return DriverManager.getConnection("jdbc:mysql://localhost:3306/bloodbank", "root","root");
		}
		catch(Exception e)
		{
			
		log.warn(e);
		}
		return null;
		
	}
	public static void releaseConnection(Connection connection) {
		
		try {
			connection.close();
		} catch (SQLException e) {
			log.warn(e);
		}
	}


}
