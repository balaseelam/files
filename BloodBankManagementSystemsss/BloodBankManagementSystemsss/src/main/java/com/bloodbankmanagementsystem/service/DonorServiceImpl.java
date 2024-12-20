package com.bloodbankmanagementsystem.service;

import java.util.List;

import com.bloodbankmanagementsystem.dao.DonorDao;
import com.bloodbankmanagementsystem.model.Donor;
import com.bloodbankmanagementsystem.model.Requester;
import com.bloodbankmanagementsystem.model.User;

public class DonorServiceImpl implements DonorService{

public static DonorServiceImpl donorService=null;
	
	public static DonorService getInstance() {
		if(donorService==null) {
			donorService= new DonorServiceImpl();
		}
		return donorService;
	}

	@Override
	public List<Requester> checkRequesters(User u) {
		
		return DonorDao.getInstance().checkRequesters(u);
	}

	@Override
	public Donor pendingDonor(Donor donor,String id,String reqId) {
		
		return DonorDao.getInstance().pendingDonor(donor,id,reqId);
	}
}
