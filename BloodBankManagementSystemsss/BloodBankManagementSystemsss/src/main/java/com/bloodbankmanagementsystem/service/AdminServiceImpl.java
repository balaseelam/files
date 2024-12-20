package com.bloodbankmanagementsystem.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.bloodbankmanagementsystem.dao.AdminDao;
import com.bloodbankmanagementsystem.model.Approval;
import com.bloodbankmanagementsystem.model.Requester;




public class AdminServiceImpl implements AdminService {
	
public static AdminServiceImpl adminService=null;

AdminDao dao=AdminDao.getInstance();
	
	public static AdminService getInstance() {
		
		if(adminService==null) {
			adminService= new AdminServiceImpl();
		}
		return adminService;
	}
	
	static List<Requester> requesterList=new ArrayList<>();

	public boolean adminServiceLogin(String mailId,String password)
	{
		return dao.adminDaoLogin(mailId, password);
		
	}
	@Override
	public Set<Approval> approvalList() {
		
		
		return dao.approvalList();
	}

	@Override
	public String changeStatus(String id, String status) {
		return AdminDao.getInstance().changeStatus(id,status);
		
	}
}
