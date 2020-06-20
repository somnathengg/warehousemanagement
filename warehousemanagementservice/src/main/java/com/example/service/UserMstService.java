package com.example.service;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.example.bean.JqxGridDatatableRequestBean;
import com.example.bean.ResponseBean;
import com.example.bean.UserMstBean;

public interface UserMstService {
	
	public ResponseBean getAllUserForDatatable(JqxGridDatatableRequestBean datatableRequestBean) throws Exception;
	ResponseBean saveUserMst (UserMstBean bean);
	ResponseBean getUserById (long  id);
	ResponseBean updateUserMst (UserMstBean bean);
	ResponseBean updateUserMstByFile (UserMstBean bean,Map<String, MultipartFile> doc);
	ResponseBean excelFileUpload (Map<String, MultipartFile> doc);
	public ResponseBean getFirstNameList();
	public ResponseBean getLastNameList();
	
}
