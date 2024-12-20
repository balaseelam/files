package com.bloodbankmanagementsystem.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class BloodBankManagementSystemDao {
	public static Connection getConnection(){
		try
		{
		Class.forName("com.mysql.cj.jdbc.Driver");
		return DriverManager.getConnection("jdbc:mysql://localhost:3306/bbms", "root","root");
		}
		catch(Exception e)
		{
			
		System.out.println(e);
		}
		return null;
		
	}
	public static void releaseConnection(Connection connection) {
		
		try {
			connection.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}


}
