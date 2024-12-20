package com.bloodbankmanagementsystem.model;
import java.util.Date;
public class Requester {

	private String requesterId;
	private String patientName;
	private String bloodGrouprequired;
	private String city;
	private String doctorName;
	private String hospitalName;
	private String hospitalAddress;
	private String date;
	private String contactName;
	private String contactNumber;
	private String contactEmail;
	private String message;
	private String confirmation;
	private String status;
	
	
	public Requester() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Requester(String patientName, String bloodGrouprequired, String city, String doctorName, String hospitalName,
			String hospitalAddress,String date, String contactName, String contactNumber, String contactEmail,
			String message,String confirmation) {
		super();
		this.patientName = patientName;
		this.bloodGrouprequired = bloodGrouprequired;
		this.city = city;
		this.doctorName = doctorName;
		this.hospitalName = hospitalName;
		this.hospitalAddress = hospitalAddress;
		this.date = date;
		this.contactName = contactName;
		this.contactNumber = contactNumber;
		this.contactEmail = contactEmail;
		this.message = message;
		this.confirmation=confirmation;
	
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getBloodGrouprequired() {
		return bloodGrouprequired;
	}

	public void setBloodGrouprequired(String bloodGrouprequired) {
		this.bloodGrouprequired = bloodGrouprequired;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public String getHospitalName() {
		return hospitalName;
	}

	public void setHospitalName(String hospitalName) {
		this.hospitalName = hospitalName;
	}

	public String getHospitalAddress() {
		return hospitalAddress;
	}

	public void setHospitalAddress(String hospitalAddress) {
		this.hospitalAddress = hospitalAddress;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getContactName() {
		return contactName;
	}

	public void setContactName(String contactName) {
		this.contactName = contactName;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getContactEmail() {
		return contactEmail;
	}

	public void setContactEmail(String contactEmail) {
		this.contactEmail = contactEmail;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getRequesterId() {
		return requesterId;
	}

	public void setRequesterId(String requesterId) {
		this.requesterId = requesterId;
	}
	
	

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	

	public String getConfirmation() {
		return confirmation;
	}

	public void setConfirmation(String confirmation) {
		this.confirmation = confirmation;
	}

	@Override
	public String toString() {
		return "Requester [ patientName=" + patientName + ", bloodGrouprequired="
				+ bloodGrouprequired + ", city=" + city + ", doctorName=" + doctorName + ", hospitalName="
				+ hospitalName + ", hospitalAddress=" + hospitalAddress + ", date=" + date + ", contactName="
				+ contactName + ", contactNumber=" + contactNumber + ", contactEmail=" + contactEmail + ", message="
				+ message + ", status=" + status + "]";
	}

	

	
	
	
}
