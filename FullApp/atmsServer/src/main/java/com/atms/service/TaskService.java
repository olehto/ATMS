package com.atms.service;

import com.atms.model.*;

import java.util.List;

/**
 * Created by alex on 3/15/2017.
 */
public interface TaskService {
    Task save(Task task);

    Task update(Task task);

    Task findOne(Integer id);

    List<Task> findAll();

    void delete(Task task);

    List<Task> findByType(Type type);

    List<Task> findByStatus(Status status);

    List<Task> findByPriority(Priority priority);
}
