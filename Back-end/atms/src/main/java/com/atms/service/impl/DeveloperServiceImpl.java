package com.atms.service.impl;

import com.atms.model.DevType;
import com.atms.model.Developer;
import com.atms.repository.DeveloperRepository;
import com.atms.service.DeveloperService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;


public class DeveloperServiceImpl implements DeveloperService {

    @Autowired
    private DeveloperRepository developerRepository;


    @Override
    public Developer save(Developer developer) {
        return developerRepository.saveAndFlush(developer);
    }

    @Override
    public Developer update(Developer developer) {
        return developerRepository.saveAndFlush(developer);
    }

    @Override
    public Developer findOne(Integer id) {
        return developerRepository.findOne(id);
    }

    @Override
    public List<Developer> findAll() {
        return developerRepository.findAll();
    }

    @Override
    public void delete(Developer developer) {
        developerRepository.delete(developer);
    }
}
