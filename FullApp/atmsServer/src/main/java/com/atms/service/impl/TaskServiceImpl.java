package com.atms.service.impl;

import com.atms.model.*;
import com.atms.repository.TaskRepository;
import com.atms.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public void delete(Task task) {
        taskRepository.delete(task);
    }

    @Override
    public List<Task> findByType(Type type) {
        return taskRepository.findByType(type);
    }

    @Override
    public List<Task> findByStatus(Status status) {
        return taskRepository.findByStatus(status);
    }

    @Override
    public List<Task> findByPriority(Priority priority) {
        return taskRepository.findByPriority(priority);
    }
}
