package com.insurance.www.repository;

import com.insurance.www.entity.UserPropertyDetailsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PropertyDetailsRepository extends JpaRepository<UserPropertyDetailsEntity, Long> {
    // Custom query to find the last updated record by ID
    @Query(value = "SELECT id FROM user_property_details_entity ORDER BY id DESC LIMIT 1", nativeQuery = true)
    UserPropertyDetailsEntity findLastUpdatedRecordById(@Param("id") long mobile);
    
    // Add additional custom query methods here if needed
}
