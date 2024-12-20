package com.bloodbankmanagementsystem.service;

import java.util.List;

import com.bloodbankmanagementsystem.dao.RequesterDao;
import com.bloodbankmanagementsystem.model.Requester;
import com.bloodbankmanagementsystem.model.User;

public class RequesterServiceImpl implements RequesterService {

	public static RequesterServiceImpl requesterService=null;
	
	public static RequesterService getInstance() {
		if(requesterService==null) {
			requesterService= new RequesterServiceImpl();
		}
		return requesterService;
	}


	@Override
	public Requester pendingStatus(Requester requester, String id) {
		return RequesterDao.getInstance().pendingStatus(requester,id);
	}


	@Override
	public List<User> checkDonors(User u) {
		
		return RequesterDao.getInstance().checkDonors(u);
	}
}
