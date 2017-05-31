package com.atms.repository;

import com.atms.model.Project;
import com.atms.model.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * DAO class for interaction between application and {@link com.atms.model.Sprint Sprint} table in DB
 *
 */

@Repository
public interface SprintRepository extends JpaRepository<Sprint, Integer> {
    List<Sprint> findByProject(Project project);
}
