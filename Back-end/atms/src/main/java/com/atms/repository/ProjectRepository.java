package com.atms.repository;

import com.atms.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by alex on 3/15/2017.
 */
public interface ProjectRepository extends JpaRepository<Project, Integer> {
}
