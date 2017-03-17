package com.atms.controller;

import com.atms.model.Priority;
import com.atms.model.Type;
import com.atms.service.PriorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by alex on 3/17/2017.
 */

@RestController
public class PriorityController {

    private final PriorityService priorityService;

    @Autowired
    public PriorityController(PriorityService priorityService) {
        this.priorityService = priorityService;
    }

    @RequestMapping(value = "/priority", method = RequestMethod.GET)
    public List<Priority> getAll() {
        return priorityService.findAll();
    }
}
