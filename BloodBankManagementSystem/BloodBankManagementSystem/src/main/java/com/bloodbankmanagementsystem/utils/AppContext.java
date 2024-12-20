package com.bloodbankmanagementsystem.utils;

import com.bloodbankmanagementsystem.model.Admin;
import com.bloodbankmanagementsystem.model.Donor;
import com.bloodbankmanagementsystem.model.Requester;
import com.bloodbankmanagementsystem.model.User;

public class AppContext {
    private static AppContext appCtx;

    private AppContext(){}

    public static AppContext getInstance(){
        if (appCtx == null){
            appCtx = new AppContext();
        }
        return appCtx;
    }

    @SuppressWarnings("unchecked")
	public <T> T getBean(String beanName) {

    if (beanName.equalsIgnoreCase("User")){
        return (T) new User();
    } else if (beanName.equalsIgnoreCase("Admin")){
        return (T) new Admin();
    }
     else if (beanName.equalsIgnoreCase("Donor")){
        return (T) new Donor();
    }
     else if (beanName.equalsIgnoreCase("Requester")){
        return (T) new Requester();
    }
        return null;
    }
}
