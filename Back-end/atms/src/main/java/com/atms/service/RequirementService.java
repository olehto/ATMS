package com.atms.service;

import com.atms.model.Requirement;

import java.util.List;

/**
 * Created by alex on 3/15/2017.
 */
public interface RequirementService {
    Requirement save(Requirement requirement);

    Requirement update(Requirement requirement);

    Requirement findOne(Integer id);

    List<Requirement> findAll();

    void delete(Requirement requirement);
}

