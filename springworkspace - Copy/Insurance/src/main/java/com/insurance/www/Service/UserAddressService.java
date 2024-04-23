package com.insurance.www.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.insurance.www.entity.UserAddressEntity;
import com.insurance.www.repository.UserAddressRepository;

@Service
public class UserAddressService {

    private final UserAddressRepository userAddressRepository;

    @Autowired
    public UserAddressService(UserAddressRepository userAddressRepository) {
        this.userAddressRepository = userAddressRepository;
    }
    
    public UserAddressEntity createUserAddress(UserAddressEntity userAddress) {
        return userAddressRepository.save(userAddress);
    }

    public List<UserAddressEntity> getAllUserAddresses() {
        return userAddressRepository.findAll();
    }

    public Optional<UserAddressEntity> getUserAddressById(String panCard) {
        return userAddressRepository.findById(panCard);
    }

    // You can add other service methods for create, update, and delete operations here
}