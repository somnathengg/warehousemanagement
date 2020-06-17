package com.example.service;

import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.bean.JqxGridDatatableRequestBean;
import com.example.bean.JqxGridDatatableResponseBean;
import com.example.bean.ResponseBean;
import com.example.bean.ResponseStatus;
import com.example.bean.UserMstBean;
import com.example.dao.UserDao;
import com.example.pojo.User;

@Service
public class UserMstServiceImpl implements UserMstService {

	@Autowired
	UserDao userMstDao;

	@Transactional
	public ResponseBean getAllUserForDatatable(JqxGridDatatableRequestBean datatableRequestBean) {
		try {
			int count = 0;
			if (datatableRequestBean.getTotalRecords() <= 0) {
				count = userMstDao.getCountForDatatable(datatableRequestBean);
			} else {
				count = datatableRequestBean.getTotalRecords();
			}
			List<UserMstBean> beans = userMstDao.getUserBeanForDatatable(datatableRequestBean);
			return ResponseBean.builder().status(ResponseStatus.SUCCESS)
					.response(
							JqxGridDatatableResponseBean.<UserMstBean>builder().rows(beans).totalRecords(count).build())
					.build();
		} catch (Exception e) {
			return ResponseBean.builder().status(ResponseStatus.FAIL).message("Something Went Wrong!!!").build();
		}
	}

	@Override
	@Transactional
	public ResponseBean saveUserMst(UserMstBean bean) {
		try {

			List<UserMstBean> beans = userMstDao.getUserMstById(bean.getId(), bean.getUsername());
			if (beans != null && beans.size() > 0) {
				return ResponseBean.builder().status(ResponseStatus.FAIL).message(" User Already Exist").build();
			}
			User test = userMstDao.getPojoFromBean(bean, null);
			Long id = userMstDao.save(test);
			bean.setId(id);
			return ResponseBean.builder().status(ResponseStatus.SUCCESS).message("RECORD_ADDED_SUCCESSFULLY")
					.response(bean).build();
		} catch (Exception e) {
			System.out.println("Exception in :::" + e.getMessage());
			return ResponseBean.builder().status(ResponseStatus.FAIL).message("SOMETHING_WENT_WRONG").build();
		}
	}

	@Override
	public ResponseBean getUserById(long id) {
		List<UserMstBean> beans = new ArrayList<UserMstBean>();
		try {
			beans = userMstDao.getUserMstById(id, null);
		} catch (Exception e) {
			return ResponseBean.builder().status(ResponseStatus.FAIL).message("SOMETHING WENT WRONG").build();
		}
		return ResponseBean.builder().status(ResponseStatus.SUCCESS).message("RECORD FETCH SUCCESSFULLY")
				.response(beans).build();
	}

	@Override
	@Transactional
	public ResponseBean updateUserMst(UserMstBean bean) {

		try {
			User pojo = userMstDao.findById(bean.getId()); 
			pojo = userMstDao.getPojoFromBean(bean, pojo);
			userMstDao.update(pojo);
			return ResponseBean.builder().status(ResponseStatus.SUCCESS).message("RECORD UPDATED SUCCESSFULLY").response(userMstDao.getBeanFromPojo(pojo)).build();
			} catch (Exception e) {
			System.out.println("Exception in :::" + e.getMessage());
			return ResponseBean.builder().status(ResponseStatus.FAIL).message("SOMETHING WENT WRONG").build();
		}

	}

}
