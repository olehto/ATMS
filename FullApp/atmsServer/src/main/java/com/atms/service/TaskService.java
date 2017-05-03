package com.atms.service;

import com.atms.model.*;

import java.sql.Timestamp;
import java.util.List;

public interface TaskService {
    Task save(Task task);

    Task update(Integer id, Task task);

    Task findOne(Integer id);

    List<Task> findAll();

    List<Task> findByProjectAndPriority(Project project, Priority priority);

    List<Task> findByProjectAndStatus(Project project, Status status);

    List<Task> findByProject(Project project);

    List<Task> findByPriority(Priority priority);

    List<Task> findByType(Type type);

    List<Task> findByStatus(Status status);

    List<Task> findByParent(Task task);

    List<Task> findByDeveloper(Developer developer);

    List<Task> findByTitleContaining(String title);
}
