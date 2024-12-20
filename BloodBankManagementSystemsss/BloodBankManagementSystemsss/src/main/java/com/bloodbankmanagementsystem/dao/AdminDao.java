package com.bloodbankmanagementsystem.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.HashSet;

import java.util.Set;


import org.apache.logging.log4j.LogManager;

import com.bloodbankmanagementsystem.config.DataBaseConnection;

import com.bloodbankmanagementsystem.model.Approval;





import com.bloodbankmanagementsystem.utils.AppContext;

public class AdminDao{
	
public static AdminDao adminDao=null;
	
	public static AdminDao getInstance() {
		if(adminDao==null) {
			adminDao= new AdminDao();
		}
		return adminDao;
	}
	
	
	static org.apache.logging.log4j.Logger log = LogManager.getLogger(AdminDao.class);
	
	Connection con = DataBaseConnection.getConnection();
	
	PreparedStatement preparedStatement = null ;

	
	public  boolean adminDaoLogin(String mailId, String password) {
		boolean isAdmin = false;
		if(mailId.equals("balaseelam@gmail.com")) {
			String query = "select * from user where email=? ";
			try {
				preparedStatement = con.prepareStatement(query);
				preparedStatement.setString(1,mailId);
				ResultSet rs = preparedStatement.executeQuery();
				if(rs.next()) {
					String pwd=rs.getString(10);
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
				log.warn(e);
				
			} finally {
				try {
					preparedStatement.close();
				} catch (SQLException e) {
					log.error("Issue with database!");
					
				}
			}

		}
	    		return isAdmin;
		
	}


	public Set<Approval> approvalList() {
		Set<Approval> approveList=new HashSet<>();
		
		try (
				
				PreparedStatement preparedStatement=con.prepareStatement("select a.approvalId,r.requesterId,r.patientName,r.bloodGroup,r.city,r.doctorName,r.hospitalName,r.hospitalAddress,r.message from approve a inner join requester r on a.requesterId=r.id inner join donor d on r.id=d.requesterId where r.status=? and d.status=?")
				
				){
			preparedStatement.setString(1, "pending");
			preparedStatement.setString(2, "pending");
			ResultSet rs=preparedStatement.executeQuery();
				
				while(rs.next()) {
				Approval approval=AppContext.getInstance().getBean("Approval");
				approval.setId(rs.getString(1));
				approval.setPatientId(rs.getString(2));
				approval.setPatientName(rs.getString(3));
				approval.setBloodGrouprequired(rs.getString(4));
				approval.setCity(rs.getString(5));
				approval.setDoctorName(rs.getString(6));
				approval.setHospitalName(rs.getString(7));
				approval.setHospitalAddress(rs.getString(8));
				approval.setMessage(rs.getString(9));
				approveList.add(approval);
		}
				
			
		}
		catch (Exception e) {
			log.warn(e);
		}
		return approveList;
	}


	
	public String changeStatus(String id, String status) {
	
		try (
				PreparedStatement statement1=con.prepareStatement("select requesterId from approve where approvalId=?");
				PreparedStatement preparedStatement=con.prepareStatement("update donor set status=? where requesterId=?");
				PreparedStatement statement=con.prepareStatement("update requester set status=? where Id=?");

			)
		{
			
			statement1.setString(1, id);
			ResultSet rs=statement1.executeQuery();
			

			rs.next();
				preparedStatement.setString(1, status);
				preparedStatement.setString(2, rs.getString(1) );
				preparedStatement.executeUpdate();
					statement.setString(1, status);
					statement.setString(2, rs.getString(1));
					statement.executeUpdate();
					if(status.equals("Accepted")) {
							return "Succesfully Accepted";
						}
						else if (status.equals("Rejected")) {
								return "Succesfully Rejected";
							
						}
					
				
		}
		catch (Exception e) {
			log.warn(e);
		}
		return null;
	}
}
