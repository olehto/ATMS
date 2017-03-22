package com.atms.repository;

import com.atms.model.Developer;
import com.atms.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeveloperRepository extends JpaRepository<Developer, Integer> {

    /**
     * Return list of developer by project
     */
    List<Developer> findByTasksSprintProject(Project project);


}
