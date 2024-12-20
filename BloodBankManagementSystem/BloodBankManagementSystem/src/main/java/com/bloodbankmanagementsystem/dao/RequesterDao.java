package com.bloodbankmanagementsystem.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.apache.logging.log4j.LogManager;

import com.bloodbankmanagementsystem.model.Requester;
import com.bloodbankmanagementsystem.model.User;
import com.bloodbankmanagementsystem.utils.AppContext;
import com.mysql.cj.protocol.Resultset;

public class RequesterDao {

	static org.apache.logging.log4j.Logger log = LogManager.getLogger(UserDao.class);
	
public static RequesterDao requesterDao=null;
	
	Connection con = BloodBankManagementSystemDao.getConnection();

	public static RequesterDao getInstance() {
		if(requesterDao==null) {
			requesterDao= new RequesterDao();
		}
		return requesterDao;
	}

	public boolean request(Requester requester,String id) {
		try (
				PreparedStatement preparedStatement=con.prepareStatement("insert into requester (requesterId,patientName,bloodGroup,city,doctorName,hospitalName,hospitalAddress,date,contactName,contactNumber,message,status,role) values(?,?,?,?,?,?,?,?,?,?,?,?,?)");
				){
			preparedStatement.setString(1, id);
			preparedStatement.setString(2, requester.getPatientName());
			preparedStatement.setString(3, requester.getBloodGrouprequired());
			preparedStatement.setString(4, requester.getCity());
			preparedStatement.setString(5, requester.getDoctorName());
			preparedStatement.setString(6, requester.getHospitalName());
			preparedStatement.setString(7, requester.getHospitalAddress());
			preparedStatement.setString(8, requester.getDate());
			preparedStatement.setString(9, requester.getContactName());
			preparedStatement.setString(10, requester.getContactNumber());
			preparedStatement.setString(11, requester.getMessage());
			preparedStatement.setString(12, requester.getStatus());
			preparedStatement.setString(13, "R");
			return preparedStatement.execute();
			
		}
		catch (Exception e) {
			log.warn(e);
		}
		return false;
	}

	public String pendingStatus(Requester requester, String id) {
		
		if(requester.getStatus().equals("pending")) {
			try (
					PreparedStatement statement=con.prepareStatement("select * from status where userId=? ");
					PreparedStatement preparedStatement=con.prepareStatement("insert into status (name,bloodGroup,userType,userId,status) values(?,?,?,?,?)");
					){
			
				statement.setString(1, id);
				ResultSet rs=statement.executeQuery();
				if(rs.next()) {
					
				while(rs.next()) {
					//rs.next();
					String uid=rs.getString(5);
					if(uid.equals(id)) {
						return "Unable to add User already exists";
					}
				}
			}
					
					User u=UserDao.getInstance().getUser(id);
					
					preparedStatement.setString(1,u.getFirstName()+" "+u.getLastName());
					preparedStatement.setString(2, requester.getBloodGrouprequired());
					u.setType("R");
					System.out.println(u.getType());
					preparedStatement.setString(3, u.getType());
					preparedStatement.setString(4, id);
					preparedStatement.setString(5, requester.getStatus());
					
					preparedStatement.executeUpdate();
					return "Request Successfull";
					
			
		}
			catch (Exception e) {
				log.warn(e);
			}
	}
		return "Request failed" ;
	}
}
