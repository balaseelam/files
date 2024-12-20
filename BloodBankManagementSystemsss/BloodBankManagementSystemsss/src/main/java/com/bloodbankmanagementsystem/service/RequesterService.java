package com.bloodbankmanagementsystem.service;

import java.util.List;

import com.bloodbankmanagementsystem.model.Requester;
import com.bloodbankmanagementsystem.model.User;

public interface RequesterService {


	Requester pendingStatus(Requester requester, String id);

	List<User> checkDonors(User u);
}
