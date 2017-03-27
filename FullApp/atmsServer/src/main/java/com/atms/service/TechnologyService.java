package com.atms.service;

import com.atms.model.Technology;

import java.util.List;

/**
 * Created by alex on 3/15/2017.
 */
public interface TechnologyService {
    Technology save(Technology technology);

    Technology update(Technology technology);

    Technology findOne(Integer id);

    List<Technology> findAll();

    boolean delete(Integer id);
}
