package com.atms.repository;

import com.atms.model.Technology;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by alex on 3/15/2017.
 */
public interface TechnologyRepository extends JpaRepository<Technology, Integer> {
}
