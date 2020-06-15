package com.example.bean;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@JsonIgnoreProperties(ignoreUnknown = true)
public class FilterGroupsBean implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private String field;
	private List<FiltersBean> filters;
	public String getField() {
		return field;
	}
	public void setField(String field) {
		this.field = field;
	}
	public List<FiltersBean> getFilters() {
		return filters;
	}
	public void setFilters(List<FiltersBean> filters) {
		this.filters = filters;
	}
	
	
	
}
