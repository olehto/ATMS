package com.atms.service;

import com.atms.model.Priority;
import com.atms.model.Project;
import com.atms.model.Status;
import com.atms.model.Task;

import java.sql.Timestamp;
import java.util.List;

/**
 * Created by alex on 3/15/2017.
 */
public interface TaskService {

    Task save(Task task);

    Task update(Task task);

    Task findOne(Integer id);

    List<Task> findAll();

    /**
     * Return list of entity by project and task's priority
     */
    List<Task> findByProjectAndPriority(Project project, Priority priority);

    /**
     * Return list of task by project and task's status
     */
    List<Task> findByProjectAndStatus(Project project, Status status);

    /**
     * Return list of task where task start time greater than param
     */
    List<Task> findByStartTimeGreater(Timestamp timestamp);


    List<Task> findByProject(Project project);
}
