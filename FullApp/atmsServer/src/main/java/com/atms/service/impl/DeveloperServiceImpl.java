package com.atms.service.impl;

import com.atms.model.Developer;
import com.atms.model.Project;
import com.atms.model.Technology;
import com.atms.repository.DeveloperRepository;
import com.atms.service.DeveloperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeveloperServiceImpl implements DeveloperService {

    private final DeveloperRepository developerRepository;

    @Autowired
    public DeveloperServiceImpl(DeveloperRepository developerRepository) {
        this.developerRepository = developerRepository;
    }


    @Override
    public Developer save(Developer developer) {
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

    @Override
    public Developer getAuth(Developer developer){
        Developer tempDev = developerRepository.findByEmail(developer.getEmail());
        if(tempDev.getPassword().equals(developer.getPassword())){
            return tempDev;
        }
        else{
            return null;
        }
    }

    /*@Override
    public List<Developer> findByTechnology(Technology technology){
        return developerRepository.findByTechnology(technology);
    }*/

    @Override
    public Developer findByEmail(String mail){
        Developer developer = developerRepository.findByEmail(mail);
        if(developer!=null){
            return developer;
        }
        else{
            return null;
        }
    }
}
