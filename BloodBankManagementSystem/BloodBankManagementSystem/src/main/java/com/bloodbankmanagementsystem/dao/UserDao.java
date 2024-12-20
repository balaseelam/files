package com.bloodbankmanagementsystem.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

import org.apache.logging.log4j.LogManager;

import com.bloodbankmanagementsystem.model.User;
import com.bloodbankmanagementsystem.utils.AppContext;

public class UserDao extends BloodBankManagementSystemDao {
	
	static org.apache.logging.log4j.Logger log = LogManager.getLogger(UserDao.class);
	
	
	public static UserDao userDao=null;
	
	public static UserDao getInstance() {
		if(userDao==null) {
			userDao= new UserDao();
		}
		return userDao;
	}
	
	Connection con = BloodBankManagementSystemDao.getConnection();
	//PreparedStatement preparedStatement = null ;
	
	public String uniqueCode() {
		UUID uniqueKey=UUID.randomUUID();
		return uniqueKey.toString().substring(0, 5);
	}
	public boolean register(User user) {
		boolean isRegistered=false;

		try (
				PreparedStatement preparedStatement=con.prepareStatement("insert into user (userId,firstName,lastName,email,bloodGroup,city,age,gender,contactNumber,password,type) values(?,?,?,?,?,?,?,?,?,?,?)");
				){
			String key=uniqueCode();
			preparedStatement.setString(1, key);
			preparedStatement.setString(2, user.getFirstName());
			preparedStatement.setString(3, user.getLastName());
			preparedStatement.setString(4, user.getMailId());
			preparedStatement.setString(5, user.getBloodGroup());
			preparedStatement.setString(6, user.getCity());
			preparedStatement.setInt(7, user.getAge());
			preparedStatement.setString(8, user.getGender());
			preparedStatement.setString(9, user.getContactNumber());
			preparedStatement.setString(10, user.getUserPassword());
			user.setType("U");
			preparedStatement.setString(11, user.getType());
			int i=preparedStatement.executeUpdate();
			if(i>0) {
				isRegistered=true;
					
			}
			
			} 
		catch (SQLException e) {
			log.warn(e);
		} 
		
		return isRegistered;
		
	}
	public User userDaoLogin(String mailId, String password) {
		//boolean isUser=false;
		try (
				PreparedStatement preparedStatement=con.prepareStatement("select * from user where email=?");
				){
			preparedStatement.setString(1, mailId);
			ResultSet rs = preparedStatement.executeQuery();
			User u=AppContext.getInstance().getBean("User");
			if(!rs.isBeforeFirst()) {
				//isUser=false;
				//log.info("User doesn't exists");
			}
			else {
				rs.next();
				String pwd=rs.getString(11);
				if(pwd.equals(password)) {
					u.setUserId(rs.getString(2));
					u.setFirstName(rs.getString(3));
					u.setLastName(rs.getString(4));
					u.setMailId(rs.getString(5));
					u.setBloodGroup(rs.getString(6));
					u.setCity(rs.getString(7));
					u.setAge(rs.getInt(8));
					u.setGender(rs.getString(9));
					u.setContactNumber(rs.getString(10));
					u.setType(rs.getString(12));
					return u;
					//isUser=true;
				}
				else {
					//isUser=false;
					log.error("Invalid Password");
				}
		}
		}
		catch(Exception e) {
			log.warn(e);
		}
		return null;
	}
	
	public String getEmail(String mailId) {
		try (
				PreparedStatement preparedStatement=con.prepareStatement("select email from user where email=?");
				){
			preparedStatement.setString(1, mailId);
			ResultSet rs = preparedStatement.executeQuery();
			if(!rs.isBeforeFirst()) {
				return null;
			}
			else {
				rs.next();
				return rs.getString(5);
		}
		}
		catch(Exception e) {
			log.warn(e);
		}
		
		return null;
	}
	

	public String getPassword(String mailId) {
		try (
				PreparedStatement preparedStatement=con.prepareStatement("select password from user where email=?");
				){
			preparedStatement.setString(1, mailId);
			ResultSet rs = preparedStatement.executeQuery();
			if(!rs.isBeforeFirst()) {
				return null;
			}
			else {
				rs.next();
				return rs.getString(11);
		}
		}
		catch(Exception e) {
			log.warn(e);
		}
		
		return null;
	}
	
	public String getType(String mailId) {
		try (
				PreparedStatement preparedStatement=con.prepareStatement("select type from user where email=?");
				){
			preparedStatement.setString(1, mailId);
			ResultSet rs = preparedStatement.executeQuery();
			//log.info(rs.getString(2));
			if(rs.isBeforeFirst()) {
				rs.next();
				return rs.getString(12);
			}
		
		}
		catch(Exception e) {
			log.warn(e);			
		}
		
		return null;
	}
	
	public User getUser(String userId) {
		try (
				PreparedStatement preparedStatement=con.prepareStatement("select * from user where userId=?");
				){
			preparedStatement.setString(1, userId);
			ResultSet rs = preparedStatement.executeQuery();
			
			if(!rs.isBeforeFirst()) {
				return null;
			}
			else {
				rs.next();
				User u=AppContext.getInstance().getBean("User");
				u.setFirstName(rs.getString(3));
				u.setLastName(rs.getString(4));
				u.setMailId(rs.getString(5));
				u.setBloodGroup(rs.getString(6));
				u.setCity(rs.getString(7));
				u.setAge(rs.getInt(8));
				u.setGender(rs.getString(9));
				u.setContactNumber(rs.getString(10));
				return u;
			}
		} catch (SQLException e) {
			log.warn(e);
		}
		return null;
	}
	
	public String getUserId(String mailId) {
		try (
				PreparedStatement preparedStatement=con.prepareStatement("select type from user where email=?");
				){
			preparedStatement.setString(1, mailId);
			ResultSet rs = preparedStatement.executeQuery();
			if(!rs.isBeforeFirst()) {
				return null;
			}
			else {
				rs.next();
				return rs.getString(2);
		}
		}
		catch(Exception e) {
			log.warn(e);
			
		}
		return null; 
	}
	public User modifyUser(User user,String id) {
		try (
				PreparedStatement preparedStatement=con.prepareStatement("update user set firstName=?,lastName=?,email=?,bloodGroup=?,city=?,age=?,gender=?,contactNumber=? ,password=? where userId=?");
				){
			preparedStatement.setString(1, user.getFirstName());
			preparedStatement.setString(2, user.getLastName());
			preparedStatement.setString(3, user.getMailId());
			preparedStatement.setString(4, user.getBloodGroup());
			preparedStatement.setString(5, user.getCity());
			preparedStatement.setInt(6, user.getAge());
			preparedStatement.setString(7, user.getGender());
			preparedStatement.setString(8, user.getContactNumber());
			preparedStatement.setString(9, user.getUserPassword());
			
			preparedStatement.setString(10, id);
			
			int i=preparedStatement.executeUpdate();
			if(i>0) {
				return user; 
			}		
		}
		catch(Exception e) {
			log.warn(e);
			
		}
		return null;
	}

	public String deleteUser(String id) {
		try (
				PreparedStatement preparedStatement=con.prepareStatement("delete from user where userId=?");
				){
			
			preparedStatement.setString(1, id);
			
			int i=preparedStatement.executeUpdate();
			if(i>0) {
				
				return "Succesfully Deleted account"; 
			}
			else {
				return "User doesn't exists";
			}
		}
		catch(Exception e) {
			log.warn(e);
			
		}
		return null;
	}


}
