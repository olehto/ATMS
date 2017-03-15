package com.atms.service.impl;

import com.atms.model.Priority;
import com.atms.repository.PriorityRepository;
import com.atms.service.PriorityService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created by alex on 3/15/2017.
 */
public class PriorityServiceImpl implements PriorityService {

    @Autowired
    private PriorityRepository priorityRepository;

    @Override
    public Priority save(Priority priority) {
        return priorityRepository.saveAndFlush(priority);
    }

    @Override
    public Priority update(Priority priority) {
        return priorityRepository.saveAndFlush(priority);
    }

    @Override
    public Priority findOne(Integer id) {
        return priorityRepository.findOne(id);
    }

    @Override
    public List<Priority> findAll() {
        return priorityRepository.findAll();
    }

    @Override
    public void delete(Priority priority) {
        priorityRepository.delete(priority);
    }
}
