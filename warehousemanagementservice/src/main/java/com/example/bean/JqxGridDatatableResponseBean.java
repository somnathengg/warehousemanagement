package com.example.bean;

import java.io.Serializable;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class JqxGridDatatableResponseBean<T> implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private int totalRecords;
	private List<T> rows;
	
}