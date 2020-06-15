package com.example.common.dao;

import java.lang.reflect.Field;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.proxy.HibernateProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import com.example.bean.FilterGroupsBean;
import com.example.bean.FilterType;
import com.example.bean.FiltersBean;

public class GenericDaoImpl<T> implements GenericDao<T> {

	@Autowired
	private NamedParameterJdbcTemplate jdbcTemplate;

	@PersistenceContext
	private EntityManager entityManager;

	protected Class<T> entity;

	public GenericDaoImpl(Class<T> entity) throws HibernateException {
		this.entity = entity;
	}

	public NamedParameterJdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public EntityManager getEntityManager() {
		return entityManager;
	}

	@Override
	public List<T> getAll() throws HibernateException {
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<T> criteriaQuery = builder.createQuery(entity);
		Root<T> root = criteriaQuery.from(entity);
		criteriaQuery.select(root);
		TypedQuery<T> query = entityManager.createQuery(criteriaQuery);
		return query.getResultList();
	}

	@Override
	public Long save(T entity) throws HibernateException {
		try {
			Field field = entity.getClass().getDeclaredField("cd");
			field.setAccessible(true);
			field.set(entity, new Date());
			// KeycloakSecurityContext keycloakSecurityContext =
			// provideKeycloakSecurityContext();
			// if (keycloakSecurityContext != null && keycloakSecurityContext.getToken() !=
			// null) {
			field = entity.getClass().getDeclaredField("cb");
			field.setAccessible(true);
			// field.set(entity, keycloakSecurityContext.getToken().getId());

			// field = entity.getClass().getDeclaredField("cbm");
			field.setAccessible(true);
			// field.set(entity, keycloakSecurityContext.getToken().getName());
			// }

			getEntityManager().persist(entity);
			field = entity.getClass().getDeclaredField("id");
			field.setAccessible(true);
			return (Long) field.get(entity);

		} catch (Exception e) {
			e.printStackTrace();
			throw new HibernateException("Created by/Created date field wrongly defined.");
		}
	}

	@Override
	public void update(T entity) throws HibernateException {
		try {
			Field field = entity.getClass().getDeclaredField("md");
			field.setAccessible(true);
			field.set(entity, new Date());
			field.setAccessible(true);
			field.setAccessible(true);
			entityManager.merge(entity);
		} catch (Exception e) {
			e.printStackTrace();
			throw new HibernateException("Modified by/Modified date field wrongly defined.");
		}
	}

	@Override
	public void delete(T entity) throws HibernateException {
		entityManager.remove(entity);
	}

	@Override
	public T findById(Long id) throws HibernateException {
		return (T) entityManager.find(entity, id);
	}

	@Override
	public Object initializeAndUnproxy(Object entity) throws HibernateException {
		if (entity == null) {
			throw new NullPointerException("Entity passed for initialization is null");
		}
		Hibernate.initialize(entity);
		if (entity instanceof HibernateProxy) {
			entity = (Object) ((HibernateProxy) entity).getHibernateLazyInitializer().getImplementation();
		}
		return entity;
	}

	@Override
	public String getJqxGridFiltterQuery(List<FilterGroupsBean> filterGroupsBeans, Map<String, String> colNameMap)
			throws Exception {
		String condition = " AND ";
		for (int i = 0; i < filterGroupsBeans.size(); i++) {
			condition += " ( ";

			FilterGroupsBean filterGroupsBean = filterGroupsBeans.get(i);
			String filterdatafield = colNameMap.get(filterGroupsBean.getField());

			for (int j = 0; j < filterGroupsBean.getFilters().size(); j++) {
				FiltersBean filtersBean = filterGroupsBean.getFilters().get(j);
				String filtervalue = filtersBean.getValue();
				if (FilterType.datefilter.equals(filtersBean.getType())) {
					if (filtervalue.matches("([A-Za-z]{3})-([0-9]{2})-([0-9]{4}) ([0-9]{2}):([0-9]{2}):([0-9]{2})")) {
						DateFormat inputFormat = new SimpleDateFormat("E MMM dd yyyy HH:mm:ss 'GMT'z");
						Date date = inputFormat.parse(filtervalue);
						DateFormat outputFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
						filtervalue = outputFormat.format(date);
					} else if (filtervalue.matches("([0-9]{2})-([A-Za-z0-9]{2})-([0-9]{4})")) {
						DateFormat inputFormat = new SimpleDateFormat("dd-MM-yyyy");
						Date date = inputFormat.parse(filtervalue);
						DateFormat outputFormat = new SimpleDateFormat("yyyy-MM-dd");
						filtervalue = outputFormat.format(date);
					} else if (filtervalue.matches("([0-9]{2})/([0-9]{2})/([0-9]{4})")) {
						DateFormat inputFormat = new SimpleDateFormat("MM/dd/yyyy");
						Date date = inputFormat.parse(filtervalue);
						DateFormat outputFormat = new SimpleDateFormat("yyyy-MM-dd");
						filtervalue = outputFormat.format(date);
					}
				}
				switch (filtersBean.getCondition()) {
				case CONTAINS:
					condition += " " + filterdatafield + " LIKE '%" + filtervalue + "%'";
					break;
				case CONTAINS_CASE_SENSITIVE:
					condition += " " + filterdatafield + " LIKE BINARY '%" + filtervalue + "%'";
					break;
				case DOES_NOT_CONTAIN:
					condition += " " + filterdatafield + " NOT LIKE '%" + filtervalue + "%'";
					break;
				case DOES_NOT_CONTAIN_CASE_SENSITIVE:
					condition += " " + filterdatafield + " NOT LIKE BINARY '%" + filtervalue + "%'";
					break;
				case EQUAL:
					condition += " " + filterdatafield + " = '" + filtervalue + "'";
					break;
				case EQUAL_CASE_SENSITIVE:
					condition += " " + filterdatafield + " LIKE BINARY '" + filtervalue + "'";
					break;
				case NOT_EQUAL:
					condition += " " + filterdatafield + " NOT LIKE '" + filtervalue + "'";
					break;
				case NOT_EQUAL_CASE_SENSITIVE:
					condition += " " + filterdatafield + " NOT LIKE BINARY '" + filtervalue + "'";
					break;
				case GREATER_THAN:
					condition += " " + filterdatafield + " > '" + filtervalue + "'";
					break;
				case LESS_THAN:
					condition += " " + filterdatafield + " < '" + filtervalue + "'";
					break;
				case GREATER_THAN_OR_EQUAL:
					condition += " " + filterdatafield + " >= '" + filtervalue + "'";
					break;
				case LESS_THAN_OR_EQUAL:
					condition += " " + filterdatafield + " <= '" + filtervalue + "'";
					break;
				case STARTS_WITH:
					condition += " " + filterdatafield + " LIKE '" + filtervalue + "%'";
					break;
				case STARTS_WITH_CASE_SENSITIVE:
					condition += " " + filterdatafield + " LIKE BINARY '" + filtervalue + "%'";
					break;
				case ENDS_WITH:
					condition += " " + filterdatafield + " LIKE '%" + filtervalue + "'";
					break;
				case ENDS_WITH_CASE_SENSITIVE:
					condition += " " + filterdatafield + " LIKE BINARY '%" + filtervalue + "'";
					break;
				case NULL:
					condition += " " + filterdatafield + " IS NULL";
					break;
				case NOT_NULL:
					condition += " " + filterdatafield + " IS NOT NULL";
					break;
				case EMPTY:
					condition += " " + filterdatafield + "=''";
					break;
				case NOT_EMPTY:
					condition += " " + filterdatafield + "!=''";
					break;
				}
				if (j != filterGroupsBean.getFilters().size() - 1) {
					condition += " " + filtersBean.getOperator() + " ";
				}
			}
			condition += " ) ";
			if (i != filterGroupsBeans.size() - 1) {
				condition += " AND ";
			}
		}
		return condition;

	}

}
