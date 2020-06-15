package com.example.common.dao;

import java.util.*;

import org.hibernate.HibernateException;

import com.example.bean.FilterGroupsBean;

public interface GenericDao<T> {
	public List<T> getAll() throws HibernateException;
	public Long save(T entity) throws HibernateException;
	public void update(T entity) throws HibernateException;
	public void delete(T entity) throws HibernateException;
	public T findById(Long id) throws HibernateException;
	public String getJqxGridFiltterQuery(List<FilterGroupsBean> filterGroupsBeans, Map<String, String> colNameMap)
			throws Exception;
	public Object initializeAndUnproxy(Object entity)  throws HibernateException;
}
