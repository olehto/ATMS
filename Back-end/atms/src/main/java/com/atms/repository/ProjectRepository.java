package com.atms.repository;

import com.atms.model.Developer;
import com.atms.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {

    /**
     * Return list of project in which developer work
     */
    List<Project> findBySprintsTasksDeveloper(Developer developer);
}