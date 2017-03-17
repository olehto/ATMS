package com.atms.repository;

import com.atms.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;


@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    /**
     * @param priority Object of class Priority
     * @return List of Task
     */
    List<Task> findByPriority(Priority priority);

    /**
     * @return List of task by task's status
     */
    List<Task> findByStatus(Status status);


    /**
     * @return List of task by keyword
     */
    List<Task> findByKeywords(Keyword keyword);

    /**
     * @return List of task where start time of task are greater than @param
     */
    List<Task> findByStartTimeGreaterThan(Timestamp timestamp);

    List<Task> findByType(Type type);
}
