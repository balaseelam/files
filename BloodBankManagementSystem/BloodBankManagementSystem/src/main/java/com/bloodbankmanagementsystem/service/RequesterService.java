package com.bloodbankmanagementsystem.service;

import com.bloodbankmanagementsystem.model.Requester;

public interface RequesterService {

	boolean request(Requester request,String id);

	String pendingStatus(Requester requester, String id);
}
