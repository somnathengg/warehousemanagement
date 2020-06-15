package com.example.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import com.example.bean.UserMstBean;

public class UserRowMapper implements RowMapper<UserMstBean>{

	@Override
	public UserMstBean mapRow(ResultSet rs, int rowNum) throws SQLException {
		return UserMstBean.builder()
				.id(rs.getLong("id"))
				.username(rs.getString("username"))
				.firstname(rs.getString("firstname"))
				.lastname(rs.getString("lastname"))
				.email(rs.getString("email"))
				.mobile(rs.getString("mobile"))
				.isactive(rs.getInt("isactive"))
				.build();
		
	}

}
