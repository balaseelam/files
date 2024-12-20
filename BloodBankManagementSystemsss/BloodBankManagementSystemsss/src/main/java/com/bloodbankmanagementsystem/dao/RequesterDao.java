package com.bloodbankmanagementsystem.dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.apache.logging.log4j.LogManager;

import com.bloodbankmanagementsystem.config.DataBaseConnection;
import com.bloodbankmanagementsystem.exception.UserNotFoundException;

import com.bloodbankmanagementsystem.model.Requester;
import com.bloodbankmanagementsystem.model.User;
import com.bloodbankmanagementsystem.utils.AppContext;


public class RequesterDao {

	static org.apache.logging.log4j.Logger log = LogManager.getLogger(RequesterDao.class);
	
public static RequesterDao requesterDao=null;
	
	Connection con = DataBaseConnection.getConnection();

	public static RequesterDao getInstance() {
		if(requesterDao==null) {
			requesterDao= new RequesterDao();
		}
		return requesterDao;
	}

	String status="pending";
	
	public String uniqueCode() {
		UUID uniqueKey=UUID.randomUUID();
		return uniqueKey.toString().substring(0, 5);
	}
	
	public List<User> checkDonors(User u) {
		List<User> l=new ArrayList<>();
		
		try (
				
				PreparedStatement preparedStatement=con.prepareStatement("select * from user u inner join donor d on u.userId=d.donorId where u.bloodGroup=? and u.city=? and u.type=? and d.status=? and userId<>d.donorId");
				
				){
			preparedStatement.setString(1, u.getBloodGroup());
			preparedStatement.setString(2, u.getCity());
			preparedStatement.setString(3, "U");
			preparedStatement.setString(4, status);
			ResultSet rs=preparedStatement.executeQuery();
			if(!rs.isBeforeFirst()) {
				throw new UserNotFoundException("No donors nearest to you");
			}
			while(rs.next()) {
				
				User user=AppContext.getInstance().getBean("User");
				user.setUserId(rs.getString(1));
				user.setFirstName(rs.getString(2));
				user.setLastName(rs.getString(3));
				user.setMailId(rs.getString(4));
				user.setBloodGroup(rs.getString(5));
				user.setCity(rs.getString(6));
				user.setAge(rs.getInt(7));
				user.setGender(rs.getString(8));
				user.setContactNumber(rs.getString(9));
				l.add(user);
			}
		
		}
		catch (Exception e) {
			log.warn(e);
		}
		return l;
	}
	
	
	
		public Requester pendingStatus(Requester requester, String id) {
	
		if(requester.getStatus().equals(status)&&requester.getDonorStatus().equals(status)) {
			try (
					PreparedStatement statement=con.prepareStatement("select * from requester where requesterId=? ");
					PreparedStatement preparedStatement=con.prepareStatement("insert into requester (Id,requesterId,patientName,bloodGroup,city,doctorName,hospitalName,hospitalAddress,date,contactName,contactNumber,contactEmail,message,status,donorStatus) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
					){
			
				statement.setString(1, id);
				ResultSet rs=statement.executeQuery();
				rs.next();
				//String rqID = rs.getString("requesterId");
				
				String key=uniqueCode();
				preparedStatement.setString(1, key);
				preparedStatement.setString(2, id);
				preparedStatement.setString(3, requester.getPatientName());
				preparedStatement.setString(4, requester.getBloodGrouprequired());
				preparedStatement.setString(5, requester.getCity());
				preparedStatement.setString(6, requester.getDoctorName());
				preparedStatement.setString(7, requester.getHospitalName());
				preparedStatement.setString(8, requester.getHospitalAddress());
				
				Date date=Date.valueOf(requester.getDate());

				preparedStatement.setDate(9, date);
				preparedStatement.setString(10, requester.getContactName());
				preparedStatement.setString(11, requester.getContactNumber());
				preparedStatement.setString(12, requester.getContactEmail());
				preparedStatement.setString(13, requester.getMessage());
				preparedStatement.setString(14, requester.getStatus());
				preparedStatement.setString(15, requester.getDonorStatus());
					int i=preparedStatement.executeUpdate();
					if(i>0) {
						return requester;
					}
			
		}
			catch (Exception e) {
				log.warn(e);
			}
	}
		return null;
	}
		
		public String getRequesterDetails(String id) {
			try (
					PreparedStatement statement=con.prepareStatement("select requesterId from requester where Id=? ");
					){
				statement.setString(1, id);
				ResultSet rs=statement.executeQuery();
				if (rs.next()) {
					
					return rs.getString(1);
				}
				else {
					throw new UserNotFoundException("Requester not found");
				}
			}
			catch (Exception e) {
				log.warn(e);
			}
			return null;
			
		}
}
