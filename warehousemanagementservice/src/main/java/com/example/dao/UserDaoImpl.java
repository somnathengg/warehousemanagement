package com.example.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

import com.example.bean.JqxGridDatatableRequestBean;
import com.example.bean.UserMstBean;
import com.example.common.dao.GenericDaoImpl;
import com.example.pojo.User;
import com.example.rowmapper.CountRowMapper;
import com.example.rowmapper.UserRowMapper;

@Repository
public class UserDaoImpl extends GenericDaoImpl<User> implements UserDao {

	public UserDaoImpl() {
		super(User.class);
	}

	@Override
	public int getCountForDatatable(JqxGridDatatableRequestBean datatableRequestBean) throws Exception {
		StringBuilder query = new StringBuilder(getUserDatatableQuery(datatableRequestBean, true));

		MapSqlParameterSource parameters = new MapSqlParameterSource();
		if (datatableRequestBean.getExtraParam() != null && !datatableRequestBean.getExtraParam().isEmpty()) {
            parameters.addValue("firstname", datatableRequestBean.getExtraParam().get("ddlFname"));
            parameters.addValue("lastname", datatableRequestBean.getExtraParam().get("ddlLname"));
        }
		List<Integer> list = getJdbcTemplate().query(query.toString(), parameters, new CountRowMapper());
		return list != null && list.size() > 0 ? list.get(0) : 0;
	}

	@Override
	public List<UserMstBean> getUserBeanForDatatable(JqxGridDatatableRequestBean datatableRequestBean) throws Exception {
		StringBuilder query = new StringBuilder(getUserDatatableQuery(datatableRequestBean, false));
		MapSqlParameterSource parameters = new MapSqlParameterSource();
		parameters.addValue("limitValue", datatableRequestBean.getPagesize());
		parameters.addValue("offsetValue", datatableRequestBean.getRecordstartindex());
		if (datatableRequestBean.getExtraParam() != null && !datatableRequestBean.getExtraParam().isEmpty()) {
            parameters.addValue("firstname", datatableRequestBean.getExtraParam().get("ddlFname"));
            parameters.addValue("lastname", datatableRequestBean.getExtraParam().get("ddlLname"));
        }
		return getJdbcTemplate().query(query.toString(), parameters, new UserRowMapper());
		
	}

	private StringBuilder getUserDatatableQuery(JqxGridDatatableRequestBean datatableRequestBean, boolean isCountQuery)
			throws Exception {
		StringBuilder query = new StringBuilder();
		Map<String, String> colNameMap = new HashMap<>();
		colNameMap.put("id", " em.id ");
		colNameMap.put("firstname", " em.firstname ");
		colNameMap.put("username", " em.username ");
		colNameMap.put("lastname", " em.lastname ");
		colNameMap.put("mobile", " em.mobile ");
		colNameMap.put("email", " em.email ");
		colNameMap.put("isactive", " em.isactive ");

		if (isCountQuery) {
			query.append(" SELECT count(*) ");
		} else {
			query.append(" SELECT em.id AS 'id', em.firstname AS 'firstname', em.lastname AS 'lastname' ,em.username AS 'username' ,em.mobile as 'mobile' ,em.email AS 'email',em.isactive AS 'isactive' ");
		}
		query.append(" FROM emp em ");
		query.append(" where 1=1 ");
		
		if (datatableRequestBean.getExtraParam() != null && !datatableRequestBean.getExtraParam().isEmpty()) {
			if(datatableRequestBean.getExtraParam().containsKey("ddlFname") && !"".equals(datatableRequestBean.getExtraParam().get("ddlFname")))
			  query.append(" AND em.firstname=:firstname "); 
		 }
		if (datatableRequestBean.getExtraParam() != null && !datatableRequestBean.getExtraParam().isEmpty()) {
			if(datatableRequestBean.getExtraParam().containsKey("ddlLname") && !"".equals(datatableRequestBean.getExtraParam().get("ddlLname")))
			  query.append(" AND em.lastname=:lastname "); 
		 }
		
		if (datatableRequestBean != null && datatableRequestBean.getFilterGroups() != null
				&& !datatableRequestBean.getFilterGroups().isEmpty()) {
			query.append(getJqxGridFiltterQuery(datatableRequestBean.getFilterGroups(), colNameMap));
		}
		if (datatableRequestBean != null && datatableRequestBean.getSortorder() != null
				&& !datatableRequestBean.getSortorder().isEmpty()) {
			query.append(" ORDER BY " + colNameMap.get(datatableRequestBean.getSortdatafield()) + " "
					+ datatableRequestBean.getSortorder());
		}
		if (!isCountQuery) {
			query.append(" LIMIT :limitValue OFFSET :offsetValue ");
		}
		return query;
	}

	@Override
	public User getPojoFromBean(UserMstBean bean, User pojo) throws Exception {
		if (pojo == null) {
			pojo = new User();
		}
		if(bean.getId() != null && bean.getId() > 0) {
			pojo.setId(bean.getId());
		}
		pojo.setFirstname(bean.getFirstname());
		pojo.setLastname(bean.getLastname());
		pojo.setMobile(bean.getMobile());
		pojo.setEmail(bean.getEmail());
		pojo.setIsactive(bean.getIsactive());
		pojo.setUsername(bean.getUsername());
		return pojo;
	}


	@Override
	public List<UserMstBean> getUserMstById(Long Id,String username) throws Exception{
		StringBuilder query = new StringBuilder(getUserMstByIdQuery());
		query.append(" AND em.username =:username ");
		if(Id != null && !Id.equals("")) {
			query.append(" AND em.id !=:Id ");
		}
		
		MapSqlParameterSource parameters = new MapSqlParameterSource();
		parameters.addValue("Id",Id);
		parameters.addValue("username",username);
		return getJdbcTemplate().query(query.toString(), parameters, new UserRowMapper());
	}
	
	
	private String getUserMstByIdQuery() {
		StringBuilder query = new StringBuilder();
		query.append(" SELECT em.id AS 'id', em.firstname AS 'firstname', em.lastname AS 'lastname' ,em.username AS 'username' ,em.mobile as 'mobile' ,em.email AS 'email',em.isactive AS 'isactive' ");
		query.append(" FROM emp em ");
		query.append(" where 1=1 ");
		return query.toString();
	}

	@Override
	public UserMstBean getBeanFromPojo(User pojo) throws Exception {
		return UserMstBean.builder()
				.id(pojo.getId())
				.username(pojo.getUsername())
				.isactive(pojo.getIsactive())
				.firstname(pojo.getFirstname())
				.lastname(pojo.getLastname())
				.mobile(pojo.getMobile())
				.email(pojo.getEmail())
				.build();
	}

}
