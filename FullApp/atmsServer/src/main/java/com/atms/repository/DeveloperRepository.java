package com.atms.repository;

import com.atms.model.Developer;
import com.atms.model.Project;
import com.atms.model.Technology;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeveloperRepository extends JpaRepository<Developer, Integer> {

    List<Developer> findByTasksSprintProject(Project project);

    List<Developer> findByEmail(String mail);

   // List<Developer> findByTechnology(Technology technology);
}
