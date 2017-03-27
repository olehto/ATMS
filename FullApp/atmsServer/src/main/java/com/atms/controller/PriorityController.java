package com.atms.controller;

import com.atms.model.Priority;
import com.atms.service.PriorityService;
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
public class PriorityController {

    private final PriorityService priorityService;

    @Autowired
    public PriorityController(PriorityService priorityService) {
        this.priorityService = priorityService;
    }

    @RequestMapping(value = "/api/priority", method = RequestMethod.GET)
    public ResponseEntity<List<Priority>> getAll() {
        List<Priority> priorities = priorityService.findAll();
        if (priorities == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(priorities, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/priority/{priorityId}", method = RequestMethod.GET)
    public ResponseEntity<Priority> get(@PathVariable("priorityId") String priorityId) {
        Priority priority = priorityService.findOne(Integer.parseInt(priorityId));
        if (priority == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(priority, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/priority", method = RequestMethod.POST)
    public ResponseEntity<Priority> add(@Valid Priority priority) {
        if (priorityService.findOne(priority.getPriorityId()) != null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(priorityService.save(priority), HttpStatus.OK);
    }

    @RequestMapping(value = "/api/priority/{priorityId}", method = RequestMethod.PUT)
    public ResponseEntity<Priority> update(@Valid Priority priority,
                                           @PathVariable("priorityId") String priorityId) {
        Priority oldPriority = priorityService.findOne(Integer.parseInt(priorityId));
        if (oldPriority == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        oldPriority.setPriorityValue(priority.getPriorityValue());
        oldPriority.setTasks(priority.getTasks());
        oldPriority = priorityService.update(oldPriority);
        return new ResponseEntity<>(oldPriority, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/priority/{priorityId}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable("priorityId") String priorityId) {
        if (priorityService.delete(Integer.parseInt(priorityId))) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
