package com.insurance.www.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.insurance.www.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByFullNameAndPassword(String fullName, String password);

    boolean existsByMobile(Long mobile);
    
    
}
