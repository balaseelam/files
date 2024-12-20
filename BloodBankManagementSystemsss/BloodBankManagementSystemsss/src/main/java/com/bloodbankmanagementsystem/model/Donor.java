package com.bloodbankmanagementsystem.model;

public class Donor {
	
private String patientId;
private String dateTime;
private int glucoseLevel;
private String confirmation;
private String status;
private String notes;


public Donor() {
	super();

}


public Donor(String patientId, String dateTime, int glucoseLevel,  String notes) {
	super();
	this.patientId = patientId;
	this.dateTime = dateTime;
	this.glucoseLevel = glucoseLevel;
	this.notes = notes;
}


public String getConfirmation() {
	return confirmation;
}


public void setConfirmation(String confirmation) {
	this.confirmation = confirmation;
}


public String getStatus() {
	return status;
}


public void setStatus(String status) {
	this.status = status;
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




@Override
public String toString() {
	return "Donor [patientId=" + patientId + ", dateTime=" + dateTime + ", glucoseLevel=" + glucoseLevel
			+  ", notes=" + notes + "]";
}






}
