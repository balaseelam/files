package com.bloodbankmanagementsystem.model;

public class Donor {
	
private String patientId;
private String dateTime;
private int glucoseLevel;
private int bloodQuantity;
private String notes;


public Donor() {
	super();
	// TODO Auto-generated constructor stub
}


public Donor(String patientId, String dateTime, int glucoseLevel, int bloodQuantity, String notes) {
	super();
	this.patientId = patientId;
	this.dateTime = dateTime;
	this.glucoseLevel = glucoseLevel;
	this.bloodQuantity = bloodQuantity;
	this.notes = notes;
}


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


public String getNotes() {
	return notes;
}


public void setNotes(String notes) {
	this.notes = notes;
}


public int getBloodQuantity() {
	return bloodQuantity;
}


public void setBloodQuantity(int bloodQuantity) {
	this.bloodQuantity = bloodQuantity;
}


@Override
public String toString() {
	return "Donor [patientId=" + patientId + ", dateTime=" + dateTime + ", glucoseLevel=" + glucoseLevel
			+ ", bloodQuantity=" + bloodQuantity + ", notes=" + notes + "]";
}






}
