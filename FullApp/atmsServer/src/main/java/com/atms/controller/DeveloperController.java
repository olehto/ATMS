package com.atms.controller;

import com.atms.model.Developer;
import com.atms.model.Technology;
import com.atms.service.DeveloperService;
import com.atms.service.ProjectService;
import com.atms.service.TechnologyService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @RequestMapping(value = "/developer", method = RequestMethod.GET)
    public List<Developer> getAll() {
        return developerService.findAll();
    }

    @RequestMapping(value = "/developer/{developerId}", method = RequestMethod.GET)
    public Developer getDeveloper(@PathVariable("developerId") String developerId) {
        return developerService.findOne(Integer.parseInt(developerId));
    }

    @RequestMapping(value = "/developer/{email}", method = RequestMethod.GET)
    public Developer remind(@PathVariable("email") String email) {
        Developer dev = developerService.findByEmail(email);
        if(!dev.getEmail().equals("")){
            dev.setPassword("default");
            return developerService.update(dev);
        }
        else{
            return new Developer();
        }
    }

    /*@RequestMapping(value = "/developer/authorize", method = RequestMethod.POST)
    public Developer authorize(Developer developer) {
        return developerService.getAuth(developer);
    }*/
    @RequestMapping(value = "/developer/authorize", method = RequestMethod.POST)
    public Developer checkAccount (/*@RequestParam(value="username", defaultValue="") String name,
                                                               @RequestParam(value="password", defaultValue="") String pass*/
                                              @RequestBody String body) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Developer account = (Developer) mapper.readValue(body, Developer.class);
            Developer temp=developerService.getAuth(account);
            if(temp.getEmail()==null)return null;
            return temp;
        }
        catch (Exception ex){
            return null;
        }

    }
    @RequestMapping(value = "/developer", method = RequestMethod.PUT)
    public Developer update(Developer developer) {
        return developerService.update(developer);
    }

    @RequestMapping(value = "/developer", method = RequestMethod.POST)
    public Developer addAccount (@RequestBody String body) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Developer account = (Developer) mapper.readValue(body, Developer.class);
            return developerService.save(account);
        }
        catch (Exception ex){
            return null;
        }

    }
    @RequestMapping(value = "/developer", method = RequestMethod.DELETE)
    public void delete(Developer developer) {
        developerService.delete(developer);
    }

    @RequestMapping(value = "/developer/project/{projectId}", method = RequestMethod.GET)
    public List<Developer> getByProject(@PathVariable("projectId") String projectId) {
        return developerService.findByProject(projectService.findOne(Integer.parseInt(projectId)));
    }

    /*@RequestMapping(value = "/developer/technology/{technologyId}", method = RequestMethod.GET)
    public List<Developer> getByTechnology(@PathVariable("technologyId") String technologyId) {
        return developerService.findByTechnology(technologyService.findOne(Integer.parseInt(technologyId)));
    }*/
}
