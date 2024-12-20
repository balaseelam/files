package com.bloodbankmanagementsystem.model;

public class User {
	
	private String userId;
	private String firstName;
	private String lastName;
	private String userPassword;
	private String bloodGroup;
	private String mailId;
	private String city;
	private int age;
	private String gender;
	private String contactNumber;
	private String type;
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getUserPassword() {
		return userPassword;
	}
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
	public String getBloodGroup() {
		return bloodGroup;
	}
	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}
	public String getMailId() {
		return mailId;
	}
	public void setMailId(String mailId) {
		this.mailId = mailId;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public User( String firstName, String lastName, String mailId,String bloodGroup, 
			String city, int age, String gender, String contactNumber,String userPassword) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.userPassword = userPassword;
		this.bloodGroup = bloodGroup;
		this.mailId = mailId;
		this.city = city;
		this.age = age;
		this.gender=gender;
		this.contactNumber = contactNumber;
	}
	public User() {
		super();
		type="U";
	}
	@Override
	public String toString() {
		return "User [firstName=" + firstName + ", lastName=" + lastName + ", bloodGroup="
				+ bloodGroup + ", mailId=" + mailId + ", city=" + city + ", age=" + age + ", gender=" + gender
				+ ", contactNumber=" + contactNumber + "]";
	}
	
	
	
	

}
