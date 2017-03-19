package com.atms.service.impl;

import com.atms.model.Priority;
import com.atms.model.Project;
import com.atms.model.Status;
import com.atms.model.Task;
import com.atms.repository.TaskRepository;
import com.atms.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

/**
 * Created by alex on 3/15/2017.
 */

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public Task save(Task task) {
        return taskRepository.saveAndFlush(task);
    }

    @Override
    public Task update(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public Task findOne(Integer id) {
        return taskRepository.findOne(id);
    }

    @Override
    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    @Override
    public List<Task> findByProjectAndPriority(Project project, Priority priority) {
        return taskRepository.findBySprintProjectAndPriority(project, priority);
    }

    @Override
    public List<Task> findByProjectAndStatus(Project project, Status status) {
        return taskRepository.findBySprintProjectAndStatus(project, status);
    }

    @Override
    public List<Task> findByStartTimeGreater(Timestamp timestamp) {
        return taskRepository.findByStartTimeGreaterThan(timestamp);
    }

    @Override
    public List<Task> findByProject(Project project) {
        return taskRepository.findBySprintProject(project);
    }

    @Override
    public boolean delete(Integer id) {
        if (taskRepository.exists(id)) {
            taskRepository.delete(id);
            return true;
        }
        return false;
    }
}
