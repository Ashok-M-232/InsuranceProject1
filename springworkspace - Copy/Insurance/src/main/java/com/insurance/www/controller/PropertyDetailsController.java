package com.insurance.www.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insurance.www.Service.PropertyDetailsService;
import com.insurance.www.entity.UserPropertyDetailsEntity;

@RestController
@RequestMapping("/api/property")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from http://localhost:3000
public class PropertyDetailsController {

    private final PropertyDetailsService propertyDetailsService;

    @Autowired
    public PropertyDetailsController(PropertyDetailsService propertyDetailsService) {
        this.propertyDetailsService = propertyDetailsService;
    }

    @GetMapping("/fetch")
    public List<UserPropertyDetailsEntity> getAllUserPropertyDetails() {
        return propertyDetailsService.getAllUserPropertyDetails();
    }


    
    @GetMapping("/first-entry")
    public UserPropertyDetailsEntity getFirstEntry() {
        // Retrieve the first entry from the table
        return propertyDetailsService.getFirstEntry();
    }

    @PostMapping("/add")
    public UserPropertyDetailsEntity saveUserPropertyDetails(@RequestBody UserPropertyDetailsEntity propertyDetails) {
        // Save the property details using the service
        return propertyDetailsService.saveUserPropertyDetails(propertyDetails);
    }

    @GetMapping("/{mobile}")
    public UserPropertyDetailsEntity getUserPropertyDetailsById(@PathVariable long mobile) {
        // Retrieve and return the last updated record for the specified ID
        return propertyDetailsService.getUserPropertyDetailsById(mobile);
    }

    @DeleteMapping("/{mobile}")
    public void deleteUserPropertyDetails(@PathVariable long mobile) {
        propertyDetailsService.deleteUserPropertyDetails(mobile);
    }
}
