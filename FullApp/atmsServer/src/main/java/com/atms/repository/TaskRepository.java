package com.atms.repository;

import com.atms.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

/**
 * DAO class for interaction between application and {@link com.atms.model.Task Task} table in DB
 *
 * @author Alex Kazanovskiy
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {

    List<Task> findByDateStartGreaterThanEqualAndDeveloper(Timestamp timestamp1, Developer developer);

    List<Task> findByDeadlineIsLessThanEqual(Timestamp timestamp);

    List<Task> findByTitleContaining(String title);

    /**
     * Returns list of task by project and task's
     *
     * @param project  object of {@link com.atms.model.Project Project}
     * @param priority object of {@link com.atms.model.Priority Priority}
     */
    List<Task> findBySprintProjectAndPriority(Project project, Priority priority);

    /**
     * Returns list of task by project and task's status
     *
     * @param project object of {@link com.atms.model.Project Project}
     * @param status  object of {@link com.atms.model.Status Status}
     */
    List<Task> findBySprintProjectAndStatus(Project project, Status status);

    /**
     * Returns list of task by project
     *
     * @param project object of {@link com.atms.model.Project Project}
     */
    List<Task> findBySprintProject(Project project);

    /**
     * Return list of task where developer is not null
     */
    List<Task> findAllByDeveloperIsNotNull();

    List<Task> findByPriority(Priority priority);

    List<Task> findByStatus(Status status);
    List<Task> findByDeveloper(Developer developer);
    List<Task> findByType(Type type);

    List<Task> findByParent(Task task);
}
