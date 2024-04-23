package com.insurance.www.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class UserAddressEntity {
    
	@Id
	private String panCard;

    @Column
    private String fullNamePrefix;
    @Column
    private String fullName;
    @Column
    private Long mobile;

    @Column
    private String dateOfBirth;
    @Column
    private String flatNo;
    @Column
    private String areaStreet;
    @Column
    private String flatNo1;
    @Column
    private String areaStreet1;
    @Column
    private String pincode;
    @Column
    private String pincodee;
    @Column
    private String isCurrentAddress;
	public Long getId() {
		return mobile;
	}
	public void setId(Long id) {
		this.mobile = id;
	}
	public String getFullNamePrefix() {
		return fullNamePrefix;
	}
	public void setFullNamePrefix(String fullNamePrefix) {
		this.fullNamePrefix = fullNamePrefix;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getPanCard() {
		return panCard;
	}
	public void setPanCard(String panCard) {
		this.panCard = panCard;
	}
	public String getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	public String getFlatNo() {
		return flatNo;
	}
	public void setFlatNo(String flatNo) {
		this.flatNo = flatNo;
	}
	public String getAreaStreet() {
		return areaStreet;
	}
	public void setAreaStreet(String areaStreet) {
		this.areaStreet = areaStreet;
	}
	public String getFlatNo1() {
		return flatNo1;
	}
	public void setFlatNo1(String flatNo1) {
		this.flatNo1 = flatNo1;
	}
	public String getAreaStreet1() {
		return areaStreet1;
	}
	public void setAreaStreet1(String areaStreet1) {
		this.areaStreet1 = areaStreet1;
	}
	public String getPincode() {
		return pincode;
	}
	public void setPincode(String pincode) {
		this.pincode = pincode;
	}
	public String getPincodee() {
		return pincodee;
	}
	public void setPincodee(String pincodee) {
		this.pincodee = pincodee;
	}
	public String getIsCurrentAddress() {
		return isCurrentAddress;
	}
	public void setIsCurrentAddress(String isCurrentAddress) {
		this.isCurrentAddress = isCurrentAddress;
	}

}