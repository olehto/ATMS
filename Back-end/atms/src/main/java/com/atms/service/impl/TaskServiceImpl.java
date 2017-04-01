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
    public Task update(Integer id, Task task) {
        Task oldTask = taskRepository.findOne(id);
        if (oldTask == null) {
            return null;
        }

        if (!oldTask.getStatus().equals(task.getStatus()))
            notifier.notifyCustomer(task);

        if (!oldTask.getDeveloper().equals(task.getDeveloper()))
            notifier.notifyDeveloper(task);

        oldTask.setTitle(task.getTitle());
        oldTask.setDescription(task.getDescription());
        oldTask.setDateStart(task.getDateStart());
        oldTask.setDeadline(task.getDeadline());
        oldTask.setVersion(task.getVersion());
        oldTask.setDuration(task.getDuration());
        oldTask.setParent(task.getParent());
        oldTask.setSubtasks(task.getSubtasks());
        oldTask.setPriority(task.getPriority());
        oldTask.setType(task.getType());
        oldTask.setStatus(task.getStatus());
        oldTask.setSprint(task.getSprint());
        oldTask.setDeveloper(task.getDeveloper());
        oldTask.setDocuments(task.getDocuments());
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
