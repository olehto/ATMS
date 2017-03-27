package com.atms.service;

import com.atms.model.Priority;

import java.util.List;

/**
 * Created by alex on 3/15/2017.
 */
public interface PriorityService {

    Priority save(Priority priority);

    Priority update(Priority priority);

    Priority findOne(Integer id);

    List<Priority> findAll();

    boolean delete(Integer id);
}
