package com.atms.service;

import com.atms.model.Developer;
import com.atms.model.PasswordResetToken;
import com.atms.model.Project;
import com.atms.model.Technology;

import java.util.List;


public interface DeveloperService {

    Developer save(Developer developer);

    Developer update(Developer developer);

    Developer findOne(Integer id);

    List<Developer> findAll();

    boolean delete(Developer developer);

    List<Developer> findByProject(Project project);

    //List<Developer> findByTechnology(Technology technology);

    Developer findByEmail(String mail);

    PasswordResetToken createPasswordResetTokenForDeveloper(Developer developer, String token);

    boolean checkPasswordResetToken(Developer developer, String token);

    Developer findByUsername(String username);

}
