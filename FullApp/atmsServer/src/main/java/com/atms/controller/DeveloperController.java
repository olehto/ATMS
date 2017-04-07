package com.atms.controller;

import com.atms.model.Developer;
import com.atms.model.PasswordResetToken;
import com.atms.model.Technology;
import com.atms.service.DeveloperService;
import com.atms.service.ProjectService;
import com.atms.service.TechnologyService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;
import javax.validation.Valid;

@CrossOrigin
@RestController
public class DeveloperController {

    private final DeveloperService developerService;

    private final ProjectService projectService;

    private final TechnologyService technologyService;

    @Autowired
    public DeveloperController(DeveloperService developerService, ProjectService projectService, TechnologyService technologyService) {
        this.developerService = developerService;
        this.projectService = projectService;
        this.technologyService = technologyService;
    }

    @RequestMapping(value = "/api/developer", method = RequestMethod.GET)
    public ResponseEntity<List<Developer>> getAll() {
        List<Developer> developers = developerService.findAll();
        if (developers == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
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

    @RequestMapping(value = "/user/resetPassword",method = RequestMethod.POST)
    public ResponseEntity<Void> resetPassword(@RequestParam("email") String email) {
        Developer developer = developerService.findByEmail(email);
        if (developer == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken=developerService.createPasswordResetTokenForDeveloper(developer, token);
        if(resetToken!=null){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
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

    @RequestMapping(value = "/api/developer/project/{projectId}", method = RequestMethod.GET)
    public ResponseEntity<List<Developer>> getByProject(@PathVariable("projectId") String projectId) {
        List<Developer> developers = developerService.findByProject(projectService.findOne(Integer.parseInt(projectId)));
        if (developers == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(developers, HttpStatus.OK);
    }

    /*@RequestMapping(value = "/developer/technology/{technologyId}", method = RequestMethod.GET)
    public List<Developer> getByTechnology(@PathVariable("technologyId") String technologyId) {
        return developerService.findByTechnology(technologyService.findOne(Integer.parseInt(technologyId)));
    }*/
}
