package com.atms.controller;

import com.atms.model.DevType;
import com.atms.service.DevTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
public class DevTypeController {

    private final DevTypeService devTypeService;

    @Autowired
    public DevTypeController(DevTypeService devTypeService) {
        this.devTypeService = devTypeService;
    }

    @RequestMapping(value = "/api/devType/get", method = RequestMethod.GET)
    public ResponseEntity<List<DevType>> getAll() {
        List<DevType> devTypes = devTypeService.findAll();
        if (devTypes == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(devTypes, HttpStatus.OK);
    }
    @RequestMapping(value = "/api/devType/get/{devTypeId}", method = RequestMethod.GET)
    public ResponseEntity<DevType> getDevType(@PathVariable("devTypeId") String devTypeId) {
        DevType devType = devTypeService.findOne(Integer.parseInt(devTypeId));
        if (devType == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(devType, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/devType", method = RequestMethod.POST)
    public ResponseEntity<DevType> addDevType(@Valid DevType devType) {
        return new ResponseEntity<>(devType, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/devType/{id}", method = RequestMethod.PUT)
    public ResponseEntity<DevType> update(@PathVariable("id") String id, @Valid DevType devType) {
        DevType oldDevType = devTypeService.findOne(Integer.parseInt(id));
        if (oldDevType == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        oldDevType.setValue(devType.getValue());
        devTypeService.update(oldDevType);
        return new ResponseEntity<>(oldDevType, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/devType/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable("id") String id) {
        if (devTypeService.delete(Integer.parseInt(id))) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
