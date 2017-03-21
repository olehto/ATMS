package com.atms.repository;

import com.atms.model.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by alex on 3/15/2017.
 */

@Repository
public interface TypeRepository extends JpaRepository<Type, Integer> {
}
