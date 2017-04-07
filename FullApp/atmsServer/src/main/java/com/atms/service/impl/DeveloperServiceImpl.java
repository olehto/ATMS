package com.atms.service.impl;

import com.atms.model.Developer;
import com.atms.model.PasswordResetToken;
import com.atms.model.Project;
import com.atms.repository.DeveloperRepository;
import com.atms.repository.PasswordTokenRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.atms.service.DeveloperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeveloperServiceImpl implements DeveloperService {

    private final DeveloperRepository developerRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final PasswordTokenRepository passwordTokenRepository;

    @Autowired
    public DeveloperServiceImpl(DeveloperRepository developerRepository, BCryptPasswordEncoder bCryptPasswordEncoder,
                                PasswordTokenRepository passwordTokenRepository) {
        this.developerRepository = developerRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.passwordTokenRepository=passwordTokenRepository;
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
        return developerRepository.findByTasksAsDeveloperSprintProject(project);
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

    public PasswordResetToken createPasswordResetTokenForDeveloper(Developer developer, String token) {
        PasswordResetToken myToken = new PasswordResetToken(token, developer);
        return passwordTokenRepository.save(myToken);
    }
}
