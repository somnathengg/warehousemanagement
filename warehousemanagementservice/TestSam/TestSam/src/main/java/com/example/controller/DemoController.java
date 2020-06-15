package com.example.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.bean.JqxGridDatatableRequestBean;
import com.example.bean.ResponseBean;
import com.example.bean.UserMstBean;
//import com.example.bean.User;
//import com.example.content.list.DataClass;
import com.example.service.UserMstServiceImpl;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class DemoController {

	Logger logger = LoggerFactory.getLogger(DemoController.class);

	@Autowired
	private UserMstServiceImpl userMstService;

	@RequestMapping(value = "/getAllUserForJqxTable", method = RequestMethod.POST)
	public ResponseBean getAllUserForJqxTable(@RequestBody JqxGridDatatableRequestBean datatableRequestBean) {
		if(null!=datatableRequestBean.getExtraParam())
		logger.info("datatableRequestBean::"+datatableRequestBean.getExtraParam().toString());
		return userMstService.getAllUserForDatatable(datatableRequestBean);
	}

	@RequestMapping(value = "/saveUserMst", method = RequestMethod.POST)
	public ResponseBean saveUserMst(@RequestBody UserMstBean userMstBean) {
		return userMstService.saveUserMst(userMstBean);
	}
	
	@RequestMapping(value = "/updateUserMst", method = RequestMethod.POST)
	public ResponseBean updateUserMst(@RequestBody UserMstBean userMstBean) {
		return userMstService.updateUserMst(userMstBean);
	}


}
