package com.atms.controller;

import com.atms.model.Developer;
import com.atms.model.Project;
import com.atms.service.DeveloperService;
import com.atms.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by alex on 3/17/2017.
 */
@RestController
public class ProjectController {

    private final ProjectService projectService;

    private final DeveloperService developerService;

    @Autowired
    public ProjectController(ProjectService projectService, DeveloperService developerService) {
        this.projectService = projectService;
        this.developerService = developerService;
    }

    @RequestMapping(value = "/project/developer/{developerId}", method = RequestMethod.GET)
    public List<Project> getByDeveloper(@PathVariable("developerId") String developerId) {
        return projectService.findByDeveloper(developerService.findOne(Integer.parseInt(developerId)));
    }

    @RequestMapping(value = "/project", method = RequestMethod.GET)
    public List<Project> getAll() {
        return projectService.findAll();
    }

    @RequestMapping(value = "/project", method = RequestMethod.PUT)
    public Project update(Project project) {
        return projectService.update(project);
    }

    @RequestMapping(value = "/project", method = RequestMethod.POST)
    public Project add(Project project) {
        return projectService.save(project);
    }

    @RequestMapping(value = "/project", method = RequestMethod.DELETE)
    public void delete(Project project) {
        projectService.delete(project);
    }

}
