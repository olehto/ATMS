package com.atms.service;

import com.atms.model.Developer;
import com.atms.model.Project;

import java.util.List;


public interface DeveloperService {

    Developer save(Developer developer);

    Developer update(Developer developer);

    Developer findOne(Integer id);

    List<Developer> findAll();

    void delete(Developer developer);

    List<Developer> findByProject(Project project);


}
