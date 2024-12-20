package com.bloodbankmanagementsystem.exception;

public class ControllerAdvice {

	public String handleUserNotFoundException(UserNotFoundException e) {
		return e.getMessage();
	}
}
