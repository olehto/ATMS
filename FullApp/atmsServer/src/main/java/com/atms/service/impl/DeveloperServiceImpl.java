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

    @Override
    public List<Developer> findByProject(Project project) {
        return developerRepository.findByTasksSprintProject(project);
    }

    @Override
    public Developer getAuth(Developer developer){
        List<Developer> list = developerRepository.findByEmail(developer.getEmail());
        if(list!=null&&list.get(0).getPassword().equals(developer.getPassword())){
            return list.get(0);
        }
        else{
            return new Developer();
        }
    }

    /*@Override
    public List<Developer> findByTechnology(Technology technology){
        return developerRepository.findByTechnology(technology);
    }*/

    @Override
    public Developer findByEmail(String mail){
        List<Developer> list = developerRepository.findByEmail(mail);
        if(list!=null){
            return list.get(0);
        }
        else{
            return new Developer();
        }
    }
}
