package com.atms.service;

import com.atms.model.Sprint;

import java.util.List;

/**
 * Created by alex on 3/15/2017.
 */
public interface SprintService {
    Sprint save(Sprint sprint);

    Sprint update(Sprint sprint);

    Sprint findOne(Integer id);

    List<Sprint> findAll();

    boolean delete(Integer id);
}
