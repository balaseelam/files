package com.bloodbankmanagementsystem.model;

public class Approval {

	private String id;
	private String patientId;
	private String dateTime;
	private int glucoseLevel;
	private String patientName;
	private String bloodGrouprequired;
	private String city;
	private String doctorName;
	private String hospitalName;
	private String hospitalAddress;
	private String message;
	public String getPatientId() {
		return patientId;
	}
	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}
	public String getDateTime() {
		return dateTime;
	}
	public void setDateTime(String dateTime) {
		this.dateTime = dateTime;
	}
	public int getGlucoseLevel() {
		return glucoseLevel;
	}
	public void setGlucoseLevel(int glucoseLevel) {
		this.glucoseLevel = glucoseLevel;
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
	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	
	
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Approval() {
		super();

	}
	
	
	public Approval(String patientId, String dateTime, int glucoseLevel, String patientName, String bloodGrouprequired,
			String city, String doctorName, String hospitalName, String hospitalAddress) {
		super();
		this.patientId = patientId;
		this.dateTime = dateTime;
		this.glucoseLevel = glucoseLevel;
		this.patientName = patientName;
		this.bloodGrouprequired = bloodGrouprequired;
		this.city = city;
		this.doctorName = doctorName;
		this.hospitalName = hospitalName;
		this.hospitalAddress = hospitalAddress;
	}
	@Override
	public String toString() {
		return "Approval [patientId=" + patientId + ", dateTime=" + dateTime + ", glucoseLevel=" + glucoseLevel
				+ ", patientName=" + patientName + ", bloodGrouprequired=" + bloodGrouprequired + ", city=" + city
				+ ", doctorName=" + doctorName + ", hospitalName=" + hospitalName + ", hospitalAddress="
				+ hospitalAddress + "]";
	}
	
	
}
