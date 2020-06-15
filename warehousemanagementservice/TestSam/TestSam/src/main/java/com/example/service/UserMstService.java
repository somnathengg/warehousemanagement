package com.example.service;

import com.example.bean.JqxGridDatatableRequestBean;
import com.example.bean.ResponseBean;
import com.example.bean.UserMstBean;

public interface UserMstService {
	
	public ResponseBean getAllUserForDatatable(JqxGridDatatableRequestBean datatableRequestBean) throws Exception;
	ResponseBean saveUserMst (UserMstBean bean);
	ResponseBean getUserById (long  id);
	ResponseBean updateUserMst (UserMstBean bean);
	
}
