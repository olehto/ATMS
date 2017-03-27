package com.atms.controller;

import com.atms.model.Developer;
import com.atms.model.Project;
import com.atms.service.DeveloperService;
import com.atms.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * Created by alex on 3/17/2017.
 */

@CrossOrigin
@RestController
public class ProjectController {

    private final ProjectService projectService;

    private final DeveloperService developerService;

    @Autowired
    public ProjectController(ProjectService projectService, DeveloperService developerService) {
        this.projectService = projectService;
        this.developerService = developerService;
    }

    @RequestMapping(value = "/api/project/{projectId}", method = RequestMethod.GET)
    public ResponseEntity<Project> get(@PathVariable("projectId") String projectId) {
        Project project = projectService.findOne(Integer.parseInt(projectId));
        if (project == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/project", method = RequestMethod.GET)
    public ResponseEntity<List<Project>> getAll() {
        List<Project> projects = projectService.findAll();
        if (projects == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/project/developer/{developerId}", method = RequestMethod.GET)
    public ResponseEntity<List<Project>> getByDeveloper(@PathVariable("developerId") String developerId) {
        Developer developer = developerService.findOne(Integer.parseInt(developerId));
        if (developer == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Project> projects = projectService.findByDeveloper(developer);
        if (projects == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/project", method = RequestMethod.POST)
    public ResponseEntity<Project> add(@Valid Project project) {
        if (projectService.findOne(project.getProjectId()) != null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(projectService.save(project), HttpStatus.OK);
    }

    @RequestMapping(value = "/api/project/{projectId}", method = RequestMethod.PUT)
    public ResponseEntity<Project> update(@Valid Project project, @PathVariable("projectId") String projectId) {
        Project oldProject = projectService.findOne(Integer.parseInt(projectId));
        if (oldProject == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        oldProject.setDescription(project.getDescription());
        oldProject.setDeadline(project.getDeadline());
        oldProject.setDateStart(project.getDateStart());
        oldProject.setTitle(project.getTitle());
        oldProject.setSprints(project.getSprints());
        return new ResponseEntity<>(projectService.update(project), HttpStatus.OK);
    }

    @RequestMapping(value = "/api/project/{projectId}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable("projectId") String projectId) {
        if (projectService.delete(Integer.parseInt(projectId))) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
