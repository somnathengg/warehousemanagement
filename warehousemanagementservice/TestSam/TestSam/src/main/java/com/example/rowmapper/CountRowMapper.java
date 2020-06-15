package com.example.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class CountRowMapper implements RowMapper<Integer>{
	
	@Override
	public Integer mapRow(ResultSet rs, int arg1) throws SQLException {
		return rs.getInt(1);
	}

}
