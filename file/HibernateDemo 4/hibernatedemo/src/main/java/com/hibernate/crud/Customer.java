package com.hibernate.crud;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Customer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int custId;
	private String custUserName;
	private String custPhoneNo;
	private String custEmail;
	
	
	
	public Customer() {
	}
	
	public Customer(int custId, String custUserName, String custPhoneNo, String custEmail) {
		super();
		this.custId = custId;
		this.custUserName = custUserName;
		this.custPhoneNo = custPhoneNo;
		this.custEmail = custEmail;
	}

	public int getCustId() {
		return custId;
	}
	public void setCustId(int custId) {
		this.custId = custId;
	}
	public String getCustUserName() {
		return custUserName;
	}
	public void setCustUserName(String custUserName) {
		this.custUserName = custUserName;
	}
	public String getCustPhoneNo() {
		return custPhoneNo;
	}
	public void setCustPhoneNo(String custPhoneNo) {
		this.custPhoneNo = custPhoneNo;
	}
	public String getCustEmail() {
		return custEmail;
	}
	public void setCustEmail(String custEmail) {
		this.custEmail = custEmail;
	}

	@Override
	public String toString() {
		return "Customer [custId=" + custId + ", custUserName=" + custUserName + ", custPhoneNo=" + custPhoneNo
				+ ", custEmail=" + custEmail + "]";
	}
	

	
	
	
	
	

}
