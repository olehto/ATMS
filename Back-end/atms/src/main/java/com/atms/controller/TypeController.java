package com.atms.controller;

import com.atms.model.Type;
import com.atms.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
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

    @RequestMapping(value = "/api/type", method = RequestMethod.GET)
    public ResponseEntity<List<Type>> getAll() {
        List<Type> types = typeService.findAll();
        if (types == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(types, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/type/{typeId}", method = RequestMethod.GET)
    public ResponseEntity<Type> get(@PathVariable("typeId") String typeId) {
        Type type = typeService.findOne(Integer.parseInt(typeId));
        if (type == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(type, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/type", method = RequestMethod.POST)
    public ResponseEntity<Type> add(@Valid Type type) {
        if (typeService.findOne(type.getTypeId()) != null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(typeService.save(type), HttpStatus.OK);
    }

    @RequestMapping(value = "/api/type/{typeId}", method = RequestMethod.PUT)
    public ResponseEntity<Type> update(@Valid Type type,
                                       @PathVariable("typeId") String typeId) {
        Type oldType = typeService.findOne(Integer.parseInt(typeId));
        if (oldType == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        oldType.setTypeValue(type.getTypeValue());
        oldType.setTasks(type.getTasks());
        oldType = typeService.update(oldType);
        return new ResponseEntity<>(oldType, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/type/{typeId}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable("typeId") String typeId) {
        if (typeService.delete(Integer.parseInt(typeId))) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
