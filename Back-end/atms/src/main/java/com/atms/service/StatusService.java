package com.atms.service;

import com.atms.model.Status;

import java.util.List;

/**
 * Created by alex on 3/15/2017.
 */
public interface StatusService {
    Status save(Status status);

    Status update(Status status);

    Status findOne(Integer id);

    List<Status> findAll();

    boolean delete(Integer id);
}
