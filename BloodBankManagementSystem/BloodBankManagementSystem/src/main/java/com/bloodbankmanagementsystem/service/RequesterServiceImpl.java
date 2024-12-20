package com.bloodbankmanagementsystem.service;

import com.bloodbankmanagementsystem.dao.RequesterDao;
import com.bloodbankmanagementsystem.model.Requester;

public class RequesterServiceImpl implements RequesterService {

	public static RequesterServiceImpl requesterService=null;
	
	public static RequesterService getInstance() {
		if(requesterService==null) {
			requesterService= new RequesterServiceImpl();
		}
		return requesterService;
	}

	@Override
	public boolean request(Requester requester,String id) {
		return RequesterDao.getInstance().request(requester,id);
	}

	@Override
	public String pendingStatus(Requester requester, String id) {
		return RequesterDao.getInstance().pendingStatus(requester,id);
	}
}
