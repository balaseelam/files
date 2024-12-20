package com.hibernate.crud;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {
	@Bean
	public Customer customer() {
		return new Customer();
	}
	

}
