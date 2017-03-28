package com.atms.service.impl;

import com.atms.model.Developer;
import com.atms.model.Project;
import com.atms.repository.DeveloperRepository;
import com.atms.service.DeveloperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Alex Kazanovskiy.
 */

@Service
public class DeveloperServiceImpl implements DeveloperService {

    private final DeveloperRepository developerRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public DeveloperServiceImpl(DeveloperRepository developerRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.developerRepository = developerRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }


    @Override
    public Developer save(Developer developer) {
        developer.setPassword(bCryptPasswordEncoder.encode(developer.getPassword()));
        return developerRepository.saveAndFlush(developer);
    }

    @Override
    public Developer update(Developer developer) {
        if (developerRepository.findOne(developer.getDeveloperId()) != null) {
            return developerRepository.saveAndFlush(developer);
        }
        return null;
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
    public boolean delete(Developer developer) {
        if (developerRepository.exists(developer.getDeveloperId())) {
            developerRepository.delete(developer);
            return true;
        }
        return false;
    }

    @Override
    public List<Developer> findByProject(Project project) {
        return developerRepository.findByTasksSprintProject(project);
    }
}
