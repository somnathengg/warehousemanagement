package com.example.pojo;
import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "emp", catalog = "employee")
public class User implements java.io.Serializable {

	private Long id;
	private String firstname;
	private String lastname;
	private String username;
	private String mobile;
	private String email;
	private int isactive;
	private Date cd;
	private Long cb;
	private Date md;
	private Long mb;
	private String ef1;
	private String ef2;
	private String ef3;
	private String ef4;

	public User() {
	}

	public User(int isactive) {
		this.isactive = isactive;
	}

	public User(String firstname, String lastname, String username, String mobile, String email, int isactive, Date cd,
			Long cb, Date md, Long mb, String ef1, String ef2, String ef3, String ef4) {
		this.firstname = firstname;
		this.lastname = lastname;
		this.username = username;
		this.mobile = mobile;
		this.email = email;
		this.isactive = isactive;
		this.cd = cd;
		this.cb = cb;
		this.md = md;
		this.mb = mb;
		this.ef1 = ef1;
		this.ef2 = ef2;
		this.ef3 = ef3;
		this.ef4 = ef4;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "firstname", length = 256)
	public String getFirstname() {
		return this.firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	@Column(name = "lastname", length = 256)
	public String getLastname() {
		return this.lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	@Column(name = "username", length = 256)
	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Column(name = "mobile", length = 256)
	public String getMobile() {
		return this.mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	@Column(name = "email", length = 256)
	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Column(name = "isactive", nullable = false)
	public int getIsactive() {
		return this.isactive;
	}

	public void setIsactive(int isactive) {
		this.isactive = isactive;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "cd", length = 19)
	public Date getCd() {
		return this.cd;
	}

	public void setCd(Date cd) {
		this.cd = cd;
	}

	@Column(name = "cb")
	public Long getCb() {
		return this.cb;
	}

	public void setCb(Long cb) {
		this.cb = cb;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "md", length = 19)
	public Date getMd() {
		return this.md;
	}

	public void setMd(Date md) {
		this.md = md;
	}

	@Column(name = "mb")
	public Long getMb() {
		return this.mb;
	}

	public void setMb(Long mb) {
		this.mb = mb;
	}

	@Column(name = "ef1", length = 256)
	public String getEf1() {
		return this.ef1;
	}

	public void setEf1(String ef1) {
		this.ef1 = ef1;
	}

	@Column(name = "ef2", length = 512)
	public String getEf2() {
		return this.ef2;
	}

	public void setEf2(String ef2) {
		this.ef2 = ef2;
	}

	@Column(name = "ef3", length = 16777215)
	public String getEf3() {
		return this.ef3;
	}

	public void setEf3(String ef3) {
		this.ef3 = ef3;
	}

	@Column(name = "ef4", length = 65535)
	public String getEf4() {
		return this.ef4;
	}

	public void setEf4(String ef4) {
		this.ef4 = ef4;
	}

}
