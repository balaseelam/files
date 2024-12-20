package com.bloodbankmanagementsystem.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.logging.log4j.LogManager;

import com.bloodbankmanagementsystem.model.Admin;

public class AdminDao extends BloodBankManagementSystemDao{
	static org.apache.logging.log4j.Logger log = LogManager.getLogger(AdminDao.class);
	
	Connection con = null;
	PreparedStatement preparedStatement = null ;

	
	public  boolean adminDaoLogin(String mailId, String password) {
		boolean isAdmin = false;
	    String query = "select * from user where email=? ";
		try {
			con = BloodBankManagementSystemDao.getConnection();
			preparedStatement = con.prepareStatement(query);
			preparedStatement.setString(1,mailId);
			ResultSet rs = preparedStatement.executeQuery();
			if(rs.next()) {
				String pwd=rs.getString(11);
				if(pwd.equals(password)) {
					isAdmin=true;
				}
				else {
					isAdmin=false;
					log.error("Invalid Password");
				}
			}
			else {
				log.error("Invalid Credentials");
			}

		} catch (SQLException e) {
			e.getLocalizedMessage();
			
		} finally {
			try {
				preparedStatement.close();
			} catch (SQLException e) {
				log.error("Issue with database!");
				e.getLocalizedMessage();
			}
		}
		return isAdmin;
		
	}
}
