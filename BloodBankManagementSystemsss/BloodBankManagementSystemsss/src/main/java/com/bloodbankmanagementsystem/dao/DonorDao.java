package com.bloodbankmanagementsystem.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.apache.logging.log4j.LogManager;

import com.bloodbankmanagementsystem.config.DataBaseConnection;
import com.bloodbankmanagementsystem.exception.UserNotFoundException;
import com.bloodbankmanagementsystem.model.Donor;
import com.bloodbankmanagementsystem.model.Requester;
import com.bloodbankmanagementsystem.model.User;
import com.bloodbankmanagementsystem.utils.AppContext;

public class DonorDao {

	static org.apache.logging.log4j.Logger log = LogManager.getLogger(DonorDao.class);

public static DonorDao donorDao=null;
	
	Connection con = DataBaseConnection.getConnection();

	public static DonorDao getInstance() {
		if(donorDao==null) {
			donorDao= new DonorDao();
		}
		return donorDao;
	}

	public String uniqueCode() {
		UUID uniqueKey=UUID.randomUUID();
		return uniqueKey.toString().substring(0, 5);
	}
	
	String status="pending";
	public List<Requester> checkRequesters(User u) {
		List<Requester> l=new ArrayList<>();
		
		try (
				PreparedStatement preparedStatement=con.prepareStatement("select * from requester where bloodGroup=? and city=? and donorStatus=?");
				
				){
			preparedStatement.setString(1, u.getBloodGroup());
			preparedStatement.setString(2, u.getCity());
			preparedStatement.setString(3, status);
			ResultSet rs=preparedStatement.executeQuery();
			if(!rs.isBeforeFirst()) {
				throw new UserNotFoundException("No requesters near to you");
				
			}
			while(rs.next()) {
				
				Requester r=AppContext.getInstance().getBean("Requester");
				r.setId(rs.getString(1));
				r.setRequesterId(rs.getString(2));
				r.setPatientName(rs.getString(3));
				r.setBloodGrouprequired(rs.getString(4));
				r.setCity(rs.getString(5));
				r.setDoctorName(rs.getString(6));
				r.setHospitalName(rs.getString(7));
				r.setHospitalAddress(rs.getString(8));
				r.setDate(rs.getString(9));
				r.setContactName(rs.getString(10));
				r.setContactNumber(rs.getString(11));
				r.setContactEmail(rs.getString(12));
				r.setMessage(rs.getString(13));
				l.add(r);
			}
			
		}
		catch (Exception e) {
			log.warn(e);
		}
		return l;
	}

	public Donor pendingDonor(Donor donor,String id,String reqId) {
		try (
				PreparedStatement statement=con.prepareStatement("select * from donor where donorId=? and patientId=? and status=?");
				PreparedStatement preparedStatement=con.prepareStatement("insert into donor (donorId,patientId,date_time,glucoseLevel,message,confirmation,status,requesterId) values(?,?,?,?,?,?,?,?)");	
				PreparedStatement statement1=con.prepareStatement("update requester set donorStatus=? where Id=?");
				PreparedStatement statement2=con.prepareStatement("insert into approve (approvalId,requesterId) values (?,?) ")
						
				){
			statement.setString(1,id);
			statement.setString(2,donor.getPatientId());
			statement.setString(3,status);
			ResultSet rs=statement.executeQuery();
			while(rs.next()) {
					String pid=rs.getString(2);
					if(id.equals(pid)&&rs.getString(8).equals("pending"))
					{
						throw new UserNotFoundException("User already donated");
						
					}
				}
				if(donor.getConfirmation().equals("yes")) {
					statement1.setString(1, "yes");
					statement1.setString(2, reqId);
					int j=statement1.executeUpdate();
					if(j>0) {
						preparedStatement.setString(1, id);
						preparedStatement.setString(2, donor.getPatientId());
						java.sql.Timestamp dateTime = new java.sql.Timestamp(new java.util.Date().getTime());
						preparedStatement.setTimestamp(3, dateTime);
						preparedStatement.setInt(4, donor.getGlucoseLevel());
						preparedStatement.setString(5, donor.getNotes());
						preparedStatement.setString(6, donor.getConfirmation());
						preparedStatement.setString(7, donor.getStatus());
						preparedStatement.setString(8,reqId );
						int i=preparedStatement.executeUpdate();
						if(i>0) {
							statement2.setString(1, uniqueCode());
							statement2.setString(2, reqId);
							int k=statement2.executeUpdate();
							if(k>0) {
							return donor;
						}
					}
						
					}
					
				}
				
				
			}
		
		catch (Exception e) {
			log.warn(e);
		}
		
		return null;
	}

}
