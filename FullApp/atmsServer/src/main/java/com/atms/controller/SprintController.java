package com.atms.controller;

import com.atms.model.Project;
import com.atms.model.Sprint;
import com.atms.service.ProjectService;
import com.atms.service.SprintService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@CrossOrigin
public class SprintController {

    private final SprintService sprintService;
    private final ProjectService projectService;

    @Autowired
    public SprintController(SprintService sprintService, ProjectService projectService) {
        this.sprintService = sprintService;
        this.projectService=projectService;
    }

    @RequestMapping(value = "/api/sprint", method = RequestMethod.GET)
    public ResponseEntity<List<Sprint>> getAll() {
        List<Sprint> sprints = sprintService.findAll();
        if (sprints == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(sprints, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/sprints/project/{projectId}", method = RequestMethod.GET)
    public ResponseEntity<List<Sprint>> getByProject(@PathVariable("projectId") int projectId) {
        Project project=projectService.findOne(projectId);
        if(project==null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        List<Sprint> sprints = sprintService.findByProject(project);
        if (sprints == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(sprints, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/sprint/{sprintId}", method = RequestMethod.GET)
    public ResponseEntity<Sprint> get(@PathVariable("sprintId") String sprintId) {
        Sprint sprint = sprintService.findOne(Integer.parseInt(sprintId));
        if (sprint == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(sprint, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/sprint/add/{projectId}", method = RequestMethod.POST)
    public ResponseEntity<Sprint> add(@RequestBody String body,@PathVariable("projectId") String projectId) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Sprint sprint= (Sprint) mapper.readValue(body, Sprint.class);
            sprint.setProject(projectService.findOne(Integer.parseInt(projectId)));
            sprint = sprintService.save(sprint);
            return new ResponseEntity<>(sprint, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/api/sprint/{sprintId}/upd/{projectId}", method = RequestMethod.PUT)
    public ResponseEntity<Sprint> update(@RequestBody String body, @PathVariable("sprintId") String sprintId,
                                         @PathVariable("projectId") String projectId) {
        Sprint oldSprint = sprintService.findOne(Integer.parseInt(sprintId));
        if (oldSprint == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        try {
            ObjectMapper mapper = new ObjectMapper();
            Sprint sprint= (Sprint) mapper.readValue(body, Sprint.class);
            oldSprint.setDateEnd(sprint.getDateEnd());
            oldSprint.setDateStart(sprint.getDateStart());
            sprint.setProject(projectService.findOne(Integer.parseInt(projectId)));
            return new ResponseEntity<>(sprintService.update(sprint), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/api/sprint/{sprintId}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable("sprintId") String sprintId) {
        if (sprintService.delete(Integer.parseInt(sprintId))) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
