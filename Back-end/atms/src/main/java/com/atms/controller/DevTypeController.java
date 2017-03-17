package com.atms.controller;

import com.atms.model.DevType;
import com.atms.service.DevTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class DevTypeController {

    private final DevTypeService devTypeService;

    @Autowired
    public DevTypeController(DevTypeService devTypeService) {
        this.devTypeService = devTypeService;
    }

    @RequestMapping(value = "/devType", method = RequestMethod.GET)
    public List<DevType> getAll() {
        return devTypeService.findAll();
    }

    @RequestMapping(value = "/devType/{devTypeId}", method = RequestMethod.GET)
    public DevType getDevType(@PathVariable("devTypeId") String devTypeId) {
        return devTypeService.findOne(Integer.parseInt(devTypeId));
    }
}
