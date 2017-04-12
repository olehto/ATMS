package com.atms.service;

import com.atms.model.Developer;
import com.atms.model.Project;

import java.util.List;

/**
 * Interface of business layer that describe work with Developer entity
 *
 * @author Alex Kazanovskiy
 */
public interface DeveloperService {

    Developer save(Developer developer);

    Developer update(Developer developer);

    Developer findOne(Integer id);

    List<Developer> findAll();

    boolean delete(Developer developer);

    /**
     * @param project object of entity Project
     * @return List of Developers
     */
    List<Developer> findByProject(Project project);

    Developer findByUsername(String username);

    Developer findByEmail(String email);

}
