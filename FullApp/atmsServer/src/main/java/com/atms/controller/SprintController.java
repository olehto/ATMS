package com.atms.controller;

import com.atms.model.Project;
import com.atms.model.Sprint;
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

    @Autowired
    public SprintController(SprintService sprintService) {
        this.sprintService = sprintService;
    }

    @RequestMapping(value = "/api/sprint", method = RequestMethod.GET)
    public ResponseEntity<List<Sprint>> getAll() {
        List<Sprint> sprints = sprintService.findAll();
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

    @RequestMapping(value = "/api/sprint", method = RequestMethod.POST)
    public ResponseEntity<Sprint> add(@RequestBody String body) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Sprint sprint= (Sprint) mapper.readValue(body, Sprint.class);
            sprint = sprintService.save(sprint);
            return new ResponseEntity<>(sprint, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/api/sprint{sprintId}", method = RequestMethod.PUT)
    public ResponseEntity<Sprint> update(@RequestBody String body, @PathVariable("sprintId") String sprintId) {
        Sprint oldSprint = sprintService.findOne(Integer.parseInt(sprintId));
        if (oldSprint == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        try {
            ObjectMapper mapper = new ObjectMapper();
            Sprint sprint= (Sprint) mapper.readValue(body, Sprint.class);
            oldSprint.setDateEnd(sprint.getDateEnd());
            oldSprint.setDateStart(sprint.getDateStart());
            oldSprint.setProject(sprint.getProject());
            oldSprint.setTasks(sprint.getTasks());
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
