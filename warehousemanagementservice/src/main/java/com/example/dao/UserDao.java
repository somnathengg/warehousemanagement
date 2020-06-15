package com.example.dao;

import java.util.List;

import com.example.bean.JqxGridDatatableRequestBean;
import com.example.bean.UserMstBean;
import com.example.common.dao.GenericDao;
import com.example.pojo.User;

public interface UserDao extends GenericDao<User> {

	public List<UserMstBean> getUserBeanForDatatable(JqxGridDatatableRequestBean datatableRequestBean) throws Exception;
	public int getCountForDatatable(JqxGridDatatableRequestBean datatableRequestBean) throws Exception;
	public User getPojoFromBean(UserMstBean bean, User pojo) throws Exception;
	List<UserMstBean> getUserMstById(Long Id, String string) throws Exception;
	UserMstBean getBeanFromPojo (User pojo) throws Exception;
	
}
