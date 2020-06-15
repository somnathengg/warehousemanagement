package com.example.bean;
import java.io.Serializable;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class FiltersBean implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private String label;
	private String value;
	private FilterCondition condition;
	private String operator;
	private String field;
	private FilterType type;
	
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public FilterCondition getCondition() {
		return condition;
	}
	public void setCondition(FilterCondition condition) {
		this.condition = condition;
	}
	public String getOperator() {
		return operator;
	}
	public void setOperator(String operator) {
		this.operator = operator;
	}
	public String getField() {
		return field;
	}
	public void setField(String field) {
		this.field = field;
	}
	public FilterType getType() {
		return type;
	}
	public void setType(FilterType type) {
		this.type = type;
	}
	
	
	
}
