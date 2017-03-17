package com.atms.controller;

import com.atms.model.Project;
import com.atms.model.Task;
import com.atms.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class TaskController {

    private final TaskService taskService;
    private final ProjectService projectService;
    private final TypeService typeService;
    private final StatusService statusService;
    private final PriorityService priorityService;

    @Autowired
    public TaskController(TaskService taskService, ProjectService projectService, TypeService typeService,
                          StatusService statusService, PriorityService priorityService) {
        this.taskService = taskService;
        this.projectService = projectService;
        this.typeService = typeService;
        this.statusService = statusService;
        this.priorityService = priorityService;
    }

    @RequestMapping(value = "/task/type/{typeId}", method = RequestMethod.GET)
    public List<Task> getByType(@PathVariable("typeId") String typeId) {
        return taskService.findByType(typeService.findOne(Integer.parseInt(typeId)));
    }

    @RequestMapping(value = "/task/status/{statusId}", method = RequestMethod.GET)
    public List<Task> getByStatus(@PathVariable("statusId") String statusId) {
        return taskService.findByStatus(statusService.findOne(Integer.parseInt(statusId)));
    }

    @RequestMapping(value = "/task/priority/{priorityId}", method = RequestMethod.GET)
    public List<Task> getByPriority(@PathVariable("priorityId") String priorityId) {
        return taskService.findByPriority(priorityService.findOne(Integer.parseInt(priorityId)));
    }

    @RequestMapping(value = "/task", method = RequestMethod.GET)
    public List<Task> getAll() {
        return taskService.findAll();
    }

    @RequestMapping(value = "/task", method = RequestMethod.PUT)
    public Task update(Task task) {
        return taskService.update(task);
    }

    @RequestMapping(value = "/task", method = RequestMethod.POST)
    public Task add(Task task) {
        return taskService.save(task);
    }

    @RequestMapping(value = "/task", method = RequestMethod.DELETE)
    public void delete(Task task) {
        taskService.delete(task);
    }
}
