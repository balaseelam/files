package com.bloodbankmanagementsystem.service;

import java.util.List;

import com.bloodbankmanagementsystem.model.Donor;
import com.bloodbankmanagementsystem.model.Requester;
import com.bloodbankmanagementsystem.model.User;

public interface DonorService {

	List<Requester> checkRequesters(User u);

	Donor pendingDonor(Donor donor,String id,String reqId);

}
