package com.hibernate.crud;

import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Configuration;

import com.hibernate.entity.Employee;

@Configuration
public class Config {
	@Bean
	public Employee employee() {
		return new Employee();
	}
	

}
