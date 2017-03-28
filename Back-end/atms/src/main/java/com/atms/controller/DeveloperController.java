package com.atms.controller;

import com.atms.model.Developer;
import com.atms.service.DeveloperService;
import com.atms.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * @author Alex Kazanovskiy.
 */

@RestController
@CrossOrigin
public class DeveloperController {

    private final DeveloperService developerService;

    private final ProjectService projectService;

    @Autowired
    public DeveloperController(DeveloperService developerService, ProjectService projectService) {
        this.developerService = developerService;
        this.projectService = projectService;
    }

    @RequestMapping(value = "/api/developer", method = RequestMethod.GET)
    public ResponseEntity<List<Developer>> getAll() {
        List<Developer> developers = developerService.findAll();
        if (developers == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(developers, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/developer/project/{projectId}", method = RequestMethod.GET)
    public ResponseEntity<List<Developer>> getByProject(@PathVariable("projectId") String projectId) {
        List<Developer> developers = developerService.findByProject(projectService.findOne(Integer.parseInt(projectId)));
        if (developers == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(developers, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/developer/{developerId}", method = RequestMethod.GET)
    public ResponseEntity<Developer> getDeveloper(@PathVariable("developerId") String developerId) {
        Developer developer = developerService.findOne(Integer.parseInt(developerId));
        if (developer == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(developer, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/developer", method = RequestMethod.POST)
    public ResponseEntity<Developer> add(@Valid Developer developer) {
        if (developerService.findOne(developer.getDeveloperId()) != null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        developer = developerService.save(developer);
        return new ResponseEntity<>(developer, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/developer", method = RequestMethod.PUT)
    public ResponseEntity<Developer> update(@Valid Developer developer) {
        if (developerService.update(developer) == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(developer, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/developer", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(Developer developer) {
        if (developerService.delete(developer)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
