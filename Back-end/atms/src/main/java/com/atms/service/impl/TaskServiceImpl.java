package com.atms.service.impl;

import com.atms.model.Priority;
import com.atms.model.Project;
import com.atms.model.Status;
import com.atms.model.Task;
import com.atms.notify.Notifier;
import com.atms.repository.TaskRepository;
import com.atms.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Alex Kazanovskiy.
 */

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final Notifier notifier;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository, Notifier notifier) {
        this.taskRepository = taskRepository;
        this.notifier = notifier;
    }

    @Override
    public Task save(Task task) {
        if (task.getDeveloper() != null) {
            notifier.notifyDeveloper(task);
        }
        return taskRepository.saveAndFlush(task);
    }

    @Override
    public Task update(Task task) {
        if (task.getStatus() != null) {
            notifier.notifyCustomer(task);
        }
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
    public List<Task> findByProject(Project project) {
        return taskRepository.findBySprintProject(project);
    }


}
