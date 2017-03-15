package com.atms.service.impl;

import com.atms.model.Sprint;
import com.atms.repository.SprintRepository;
import com.atms.service.SprintService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created by alex on 3/15/2017.
 */
public class SprintServiceImpl implements SprintService {

    @Autowired
    private SprintRepository sprintRepository;

    @Override
    public Sprint save(Sprint sprint) {
        return sprintRepository.saveAndFlush(sprint);
    }

    @Override
    public Sprint update(Sprint sprint) {
        return sprintRepository.saveAndFlush(sprint);
    }

    @Override
    public Sprint findOne(Integer id) {
        return sprintRepository.findOne(id);
    }

    @Override
    public List<Sprint> findAll() {
        return sprintRepository.findAll();
    }

    @Override
    public void delete(Sprint sprint) {
        sprintRepository.delete(sprint);
    }
}
