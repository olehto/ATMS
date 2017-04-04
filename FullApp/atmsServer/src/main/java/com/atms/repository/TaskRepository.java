package com.atms.repository;

import com.atms.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {

    //List<Task> findByStartTimeGreaterThan(Timestamp timestamp);

    List<Task> findBySprintProjectAndPriority(Project project, Priority priority);

    List<Task> findBySprintProjectAndStatus(Project project, Status status);

    List<Task> findBySprintProject(Project project);

    List<Task> findByPriority(Priority priority);

    List<Task> findByStatus(Status status);

    List<Task> findByType(Type type);

    List<Task> findByParent(Task task);

    /**
     * Return list of task where developer is not null
     */
    List<Task> findAllByDeveloperIsNotNull();


}
