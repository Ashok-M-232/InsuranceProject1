package com.insurance.www.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.insurance.www.entity.User;
import com.insurance.www.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long mobile) {
        return userRepository.findById(mobile);
    }

    public User saveUser(User user) {
        // Check if the mobile number already exists
        if (userRepository.existsByMobile(user.getMobile())) {
            throw new IllegalArgumentException("Mobile number already exists");
        }
        return userRepository.save(user);
    }
    
    public boolean checkUserExistence(String fullName, String password) {
        // Implement logic to check if user exists based on provided credentials
        Optional<User> user = userRepository.findByFullNameAndPassword(fullName, password);
        return user.isPresent();
    }

    public void deleteUser(Long mobile) {
        userRepository.deleteById(mobile);
    }

	public boolean existsByMobile(Long mobile) {
		// TODO Auto-generated method stub
		return false;
	}
}
