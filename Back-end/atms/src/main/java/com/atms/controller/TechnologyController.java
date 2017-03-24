package com.atms.controller;

import com.atms.model.Technology;
import com.atms.service.TechnologyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@CrossOrigin
public class TechnologyController {

    private final TechnologyService technologyService;

    @Autowired
    public TechnologyController(TechnologyService technologyService) {
        this.technologyService = technologyService;
    }

    @RequestMapping(value = "/api/technology", method = RequestMethod.GET)
    public ResponseEntity<List<Technology>> getAll() {
        List<Technology> technologies = technologyService.findAll();
        if (technologies == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(technologies, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/technology/{technologyId}", method = RequestMethod.GET)
    public ResponseEntity<Technology> get(@PathVariable("technologyId") String technologyId) {
        Technology technology = technologyService.findOne(Integer.parseInt(technologyId));
        if (technology == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(technology, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/technology", method = RequestMethod.POST)
    public ResponseEntity<Technology> add(@Valid Technology technology) {
        if (technologyService.findOne(technology.getTechnologyId()) != null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(technologyService.save(technology), HttpStatus.OK);
    }

    @RequestMapping(value = "/api/technology/{technologyId}", method = RequestMethod.PUT)
    public ResponseEntity<Technology> update(@Valid Technology technology,
                                             @PathVariable("technologyId") String technologyId) {
        Technology oldTechnology = technologyService.findOne(Integer.parseInt(technologyId));
        if (oldTechnology == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        oldTechnology.setDescription(technology.getDescription());
        oldTechnology.setTitle(technology.getTitle());
        oldTechnology.setDevelopers(technology.getDevelopers());
        oldTechnology = technologyService.update(oldTechnology);
        return new ResponseEntity<>(oldTechnology, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/technology/{technologyId}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable("technologyId") String technologyId) {
        if (technologyService.delete(Integer.parseInt(technologyId))) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
