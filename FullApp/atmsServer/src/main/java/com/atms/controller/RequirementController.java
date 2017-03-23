package com.atms.controller;

import com.atms.model.Requirement;
import com.atms.service.RequirementService;
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
public class RequirementController {

    private final RequirementService requirementService;

    @Autowired
    public RequirementController(RequirementService requirementService) {
        this.requirementService = requirementService;
    }

    @RequestMapping(value = "/api/requirement", method = RequestMethod.GET)
    public ResponseEntity<List<Requirement>> getAll() {
        List<Requirement> requirements = requirementService.findAll();
        if (requirements == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(requirements, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/requirement/{requirementId}", method = RequestMethod.GET)
    public ResponseEntity<Requirement> get(@PathVariable("requirementId") String requirementId) {
        Requirement requirement = requirementService.findOne(Integer.parseInt(requirementId));
        if (requirement == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(requirement, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/requirement", method = RequestMethod.POST)
    public ResponseEntity<Requirement> add(@Valid Requirement requirement) {
        if (requirementService.findOne(requirement.getRequirementId()) != null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(requirementService.save(requirement), HttpStatus.OK);
    }

    @RequestMapping(value = "/api/requirement/{requirementId}", method = RequestMethod.PUT)
    public ResponseEntity<Requirement> update(@Valid Requirement requirement,
                                              @PathVariable("requirementId") String requirementId) {
        Requirement oldRequirement = requirementService.findOne(Integer.parseInt(requirementId));
        if (oldRequirement == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        oldRequirement.setDescription(requirement.getDescription());
        oldRequirement.setTasks(requirement.getTasks());
        oldRequirement.setTitle(requirement.getTitle());
        oldRequirement = requirementService.update(oldRequirement);
        return new ResponseEntity<>(oldRequirement, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/requirement/{requirementId}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable("requirementId") String requirementId) {
        if (requirementService.delete(Integer.parseInt(requirementId))) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
