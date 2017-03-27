package com.atms.repository;

import com.atms.model.DevType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by alex on 3/15/2017.
 */

@Repository
public interface DevTypeRepository extends JpaRepository<DevType, Integer> {
}
