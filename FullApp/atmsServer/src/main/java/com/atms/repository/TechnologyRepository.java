package com.atms.repository;

import com.atms.model.Developer;
import com.atms.model.Technology;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by alex on 3/15/2017.
 */

@Repository
public interface TechnologyRepository extends JpaRepository<Technology, Integer> {
    List<Technology> findByRequirementsTasksDeveloper(Developer developer);
}
