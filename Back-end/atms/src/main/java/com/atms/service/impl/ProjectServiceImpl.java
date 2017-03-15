package com.atms.service.impl;

import com.atms.model.Project;
import com.atms.repository.ProjectRepository;
import com.atms.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created by alex on 3/15/2017.
 */
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public Project save(Project project) {
        return projectRepository.saveAndFlush(project);
    }

    @Override
    public Project update(Project project) {
        return projectRepository.saveAndFlush(project);
    }

    @Override
    public Project findOne(Integer id) {
        return projectRepository.findOne(id);
    }

    @Override
    public List<Project> findAll() {
        return projectRepository.findAll();
    }

    @Override
    public void delete(Project project) {
        projectRepository.delete(project);
    }
}
