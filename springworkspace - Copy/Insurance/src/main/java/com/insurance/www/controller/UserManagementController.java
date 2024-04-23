package com.insurance.www.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insurance.www.Service.UserService;
import com.insurance.www.entity.User;

@RestController
@RequestMapping("/api/signin")
public class UserManagementController {

    private final UserService userService;

    @Autowired
    public UserManagementController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{mobile}")
    public Optional<User> getUserById(@PathVariable Long mobile) {
        return userService.getUserById(mobile);
    }
    
    

    @PostMapping("/add")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        if (userService.existsByMobile(user.getMobile())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Mobile number already exists");
        }
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @PutMapping("/{mobile}")
    public User updateUser(@PathVariable Long mobile, @RequestBody User user) {
        // Check if user with given id exists
        Optional<User> existingUser = userService.getUserById(mobile);
        if (existingUser.isPresent()) {
            user.setMobile(mobile); // Ensure the ID in the request body matches the path ID
            return userService.saveUser(user);
        } else {
            // Handle the case where user with given id does not exist
            // For simplicity, you can throw an exception or return a custom error response
            return null;
        }
    }

    @PostMapping("/check")
    public boolean checkUserExistence(@RequestBody User user) {
        // Call the service method to check if the user exists
        return userService.checkUserExistence(user.getFullName(), user.getPassword());
    }

    @DeleteMapping("/{mobile}")
    public void deleteUser(@PathVariable Long mobile) {
        userService.deleteUser(mobile);
    }
    
    
}
