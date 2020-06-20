package com.example.bean;

import java.io.File;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Builder;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Builder
@Data
public class UserMstBean {
	
	private Long id;
	private String firstname;
	private String lastname;
	private String username;
	private String mobile;
	private String email;
	private int isactive;
	List<UserAddressBean> addressList;
}


