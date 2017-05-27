package com.atms.service;

import com.atms.model.*;

import java.sql.Timestamp;
import java.util.List;

/**
 * Interface of business layer that describe work with Task entity
 *
 * @author Alex Kazanovskiy
 */
public interface TaskService {

    Task save(Task task);

    Task update(Integer id, Task task);

    Task findOne(Integer id);

    List<Task> findAll();

    /**
     * Find all task of project with concrete priority
     *
     * @param project  object of Project
     * @param priority object of Priority
     * @return List of Task
     */
    List<Task> findByProjectAndPriority(Project project, Priority priority);

    /**
     * Find all task of project with concrete status
     *
     * @param project object of Project
     * @param status  object of Status
     * @return List of Task
     */
    List<Task> findByProjectAndStatus(Project project, Status status);

    /**
     * Find all task of project
     *
     * @param project object of Project
     * @return List of Task
     */
    List<Task> findByProject(Project project);

    List<Task> findByStartTimeGreaterAndDeveloper(Timestamp start,Developer developer);

    List<Task> findByDeadlineLess(Timestamp timestamp);

    List<Task> findByTitleContaining(String title);

    List<Task> findByPriority(Priority priority);

    List<Task> findByType(Type type);
    List<Task> findAll(List<Integer> taskIds);
    List<Task> findByStatus(Status status);
    Task close(Task task);
    List<Task> findByDeveloper(Developer developer);
    List<Task> findByParent(Task task);
}
