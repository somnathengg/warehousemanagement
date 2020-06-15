package com.example.bean;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ResponseBean {

	private ResponseStatus status;
	private String message;
	private Object response;
}