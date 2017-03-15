package com.atms.service;

import com.atms.model.Priority;
import com.atms.model.Project;

import java.util.List;

/**
 * Created by alex on 3/15/2017.
 */
public interface ProjectService {
    Project save(Project project);

    Project update(Project project);

    Project findOne(Integer id);

    List<Project> findAll();

    void delete(Project project);
}
