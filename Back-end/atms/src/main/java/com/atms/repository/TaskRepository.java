package com.atms.repository;

import com.atms.model.Keyword;
import com.atms.model.Priority;
import com.atms.model.Status;
import com.atms.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

/**
 * DAO class for interaction between application and Task table in DB
 * @author Alex Kazanovskiy
 */
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
}
