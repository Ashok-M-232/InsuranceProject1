package com.insurance.www.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.insurance.www.entity.UserPropertyDetailsEntity;
import com.insurance.www.repository.PropertyDetailsRepository;

@Service
public class PropertyDetailsService {

    private final PropertyDetailsRepository propertyDetailsRepository;

    @Autowired
    public PropertyDetailsService(PropertyDetailsRepository propertyDetailsRepository) {
        this.propertyDetailsRepository = propertyDetailsRepository;
    }

    public List<UserPropertyDetailsEntity> getAllUserPropertyDetails() {
        return propertyDetailsRepository.findAll();
    }

//    public UserPropertyDetailsEntity getUserPropertyDetailsById(long mobile) {
//        return propertyDetailsRepository.findLastUpdatedRecordById(mobile);
//    }

    public UserPropertyDetailsEntity saveUserPropertyDetails(UserPropertyDetailsEntity propertyDetails) {
        return propertyDetailsRepository.save(propertyDetails);
    }

    public void deleteUserPropertyDetails(long mobile) {
        propertyDetailsRepository.deleteById(mobile);
    }

    public UserPropertyDetailsEntity findLastUpdatedRecordById(long mobile) {
        // Implement logic to find the last updated record by ID here
        // For now, returning null as placeholder
        return null;
    }
    
    public UserPropertyDetailsEntity getFirstEntry() {
        // Retrieve the first entry from the repository
        List<UserPropertyDetailsEntity> allEntries = propertyDetailsRepository.findAll();
        return allEntries.isEmpty() ? null : allEntries.get(0);
    }
    public UserPropertyDetailsEntity getUserPropertyDetailsById(long mobile) {
        // Retrieve and return the UserPropertyDetailsEntity for the specified mobile number
        // Assumes that the repository provides a method to find by mobile
        return propertyDetailsRepository.findById(mobile).orElse(null);
    }
}
