package com.atms.controller;

import com.atms.model.Technology;
import com.atms.model.Type;
import com.atms.service.TechnologyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class TechnologyController {

    private final TechnologyService technologyService;

    @Autowired
    public TechnologyController(TechnologyService technologyService) {
        this.technologyService = technologyService;
    }

    @RequestMapping(value = "/technology", method = RequestMethod.GET)
    public List<Technology> getAll() {
        return technologyService.findAll();
    }
}
