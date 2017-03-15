package com.atms.service.impl;

import com.atms.model.Status;
import com.atms.repository.StatusRepository;
import com.atms.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created by alex on 3/15/2017.
 */
public class StatusServiceImpl implements StatusService {

    @Autowired
    private StatusRepository statusRepository;

    @Override
    public Status save(Status status) {
        return statusRepository.saveAndFlush(status);
    }

    @Override
    public Status update(Status status) {
        return statusRepository.save(status);
    }

    @Override
    public Status findOne(Integer id) {
        return statusRepository.findOne(id);
    }

    @Override
    public List<Status> findAll() {
        return statusRepository.findAll();
    }

    @Override
    public void delete(Status status) {
        statusRepository.delete(status);
    }
}
