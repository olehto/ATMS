package com.atms.repository;

import com.atms.model.Priority;
import org.springframework.data.jpa.repository.JpaRepository;


/**
 * Created by alex on 3/15/2017.
 */
public interface PriorityRepository extends JpaRepository<Priority, Integer> {
}
