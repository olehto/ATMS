package com.atms.service;

import com.atms.model.Project;
import com.atms.model.Sprint;

import java.util.List;

/**
 * Interface of business layer that describe work with Sprint entity
 *
 */
public interface SprintService {

    Sprint save(Sprint sprint);

    Sprint update(Sprint sprint);

    Sprint findOne(Integer id);

    List<Sprint> findAll();

    List<Sprint> findByProject(Project project);

    boolean delete(Integer id);
}
