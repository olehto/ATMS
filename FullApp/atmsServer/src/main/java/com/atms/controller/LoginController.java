package com.atms.controller;

import com.atms.model.DevType;
import com.atms.model.Developer;
import com.atms.service.DevTypeService;
import com.atms.service.DeveloperService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin
@RestController
public class LoginController {


    private final DeveloperService developerService;
    private final DevTypeService devTypeService;

    @Autowired
    public LoginController(DeveloperService developerService, DevTypeService devTypeService) {
        this.developerService = developerService;
        this.devTypeService = devTypeService;
    }


    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<Developer> addAccount(@RequestBody String body) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Developer account = (Developer) mapper.readValue(body, Developer.class);
            if (developerService.findByEmail(account.getEmail()) != null) {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
            account = developerService.save(account);
            return new ResponseEntity<>(account, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
