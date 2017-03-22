package com.atms.repository;

import com.atms.model.Priority;
import com.atms.model.Project;
import com.atms.model.Status;
import com.atms.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

/**
 * DAO class for interaction between application and Task table in DB
 *
 * @author Alex Kazanovskiy
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {

    /**
     * Returns list of task where task's start time greater than timestamp
     *
     * @param timestamp time
     */
    List<Task> findByStartTimeGreaterThan(Timestamp timestamp);

    /**
     * Returns list of task by project and task's
     *
     * @param project  project
     * @param priority task's priority
     */
    List<Task> findBySprintProjectAndPriority(Project project, Priority priority);

    /**
     * Returns list of task by project and task's status
     *
     * @param project project
     * @param status  task's status
     */
    List<Task> findBySprintProjectAndStatus(Project project, Status status);

    /**
     * Returns list of task by project
     *
     * @param project project
     */
    List<Task> findBySprintProject(Project project);


}
