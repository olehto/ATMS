package com.atms.controller;

import com.atms.model.Developer;
import com.atms.model.Type;
import com.atms.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by alex on 3/17/2017.
 */

@RestController
public class TypeController {

    private final TypeService typeService;

    @Autowired
    public TypeController(TypeService typeService) {
        this.typeService = typeService;
    }

    @RequestMapping(value = "/type", method = RequestMethod.GET)
    public List<Type> getAll() {
        return typeService.findAll();
    }

    @RequestMapping(value = "/type/{typeId}", method = RequestMethod.GET)
    public Type getType(@PathVariable("typeId") String typeId) {
        return typeService.findOne(Integer.parseInt(typeId));
    }

}
