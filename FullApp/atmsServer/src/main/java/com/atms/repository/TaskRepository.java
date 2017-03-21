package com.atms.repository;

import com.atms.model.Priority;
import com.atms.model.Project;
import com.atms.model.Status;
import com.atms.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {

    List<Task> findByStartTimeGreaterThan(Timestamp timestamp);

    List<Task> findBySprintProjectAndPriority(Project project, Priority priority);

    List<Task> findBySprintProjectAndStatus(Project project, Status status);

    List<Task> findBySprintProject(Project project);


}
