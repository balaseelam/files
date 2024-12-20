package com.bloodbankmanagementsystem.service;


import java.util.Set;

import com.bloodbankmanagementsystem.model.Approval;



public interface AdminService {
	
	public  boolean adminServiceLogin(String mailId,String password);
	
	public Set<Approval> approvalList();


	public String changeStatus(String id, String status);

}
