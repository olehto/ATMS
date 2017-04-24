package com.atms.controller;

import com.atms.model.Priority;
import com.atms.model.Project;
import com.atms.model.Status;
import com.atms.model.Task;
import com.atms.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

/**
 * @author Alex Kazanovskiy.
 */

@RestController
@CrossOrigin
public class TaskController {
    private final TaskService taskService;
    private final ProjectService projectService;
    private final StatusService statusService;
    private final PriorityService priorityService;
    private final DescriptionSimilarity descriptionSimilarity;

    @Autowired
    public TaskController(ProjectService projectService, StatusService statusService,
                          PriorityService priorityService, TaskService taskService,
                          DescriptionSimilarity descriptionSimilarity) {
        this.projectService = projectService;
        this.statusService = statusService;
        this.priorityService = priorityService;
        this.taskService = taskService;
        this.descriptionSimilarity = descriptionSimilarity;
    }

    @RequestMapping(value = "/api/task", method = RequestMethod.GET)
    public ResponseEntity<List<Task>> getAll() {
        List<Task> tasks = taskService.findAll();
        if (tasks == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/task/{id}", method = RequestMethod.GET)
    public ResponseEntity<Task> get(@PathVariable("id") String id) {
        Task task = taskService.findOne(Integer.parseInt(id));
        if (task == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/task/project/{projectId}", method = RequestMethod.GET)
    public ResponseEntity<List<Task>> getByProject(@PathVariable("projectId") String projectId) {
        Project project = projectService.findOne(Integer.parseInt(projectId));
        if (project == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Task> tasks = taskService.findByProject(project);
        if (tasks == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/task/project/{projectId}/status/{statusId}", method = RequestMethod.GET)
    public ResponseEntity<List<Task>> getByProjectAndStatus(@PathVariable("projectId") String projectId,
                                                            @PathVariable("statusId") String statusId) {
        Project project = projectService.findOne(Integer.parseInt(projectId));
        if (project == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Status status = statusService.findOne(Integer.parseInt(statusId));
        if (status == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Task> tasks = taskService.findByProjectAndStatus(project, status);
        if (tasks == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/task/project/{projectId}/priority/{priorityId}", method = RequestMethod.GET)
    public ResponseEntity<List<Task>> getByProjectAndPriority(@PathVariable("projectId") String projectId,
                                                              @PathVariable("priorityId") String priorityId) {
        Project project = projectService.findOne(Integer.parseInt(projectId));
        if (project == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Priority priority = priorityService.findOne(Integer.parseInt(priorityId));
        if (priority == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Task> tasks = taskService.findByProjectAndPriority(project, priority);
        if (tasks == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/task", method = RequestMethod.POST)
    public ResponseEntity<Task> add(@Valid Task task) {
        if (taskService.findOne(task.getTaskId()) != null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(taskService.save(task), HttpStatus.OK);
    }

    @RequestMapping(value = "/api/task/{taskId}", method = RequestMethod.PUT)
    public ResponseEntity<Task> update(@Valid Task task, @PathVariable("taskId") String taskId) {
        task = taskService.update(Integer.parseInt(taskId), task);
        if (task == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(task, HttpStatus.OK);
    }


    @RequestMapping(value = "/api/task/similar/{taskId}", method = RequestMethod.GET)
    public ResponseEntity<Map<Integer, Integer>> getSimilar(@PathVariable("taskId") String taskId) {
        Task task;
        if ((task = taskService.findOne(Integer.parseInt(taskId))) == null)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        Map<Integer, Integer> similar = descriptionSimilarity.findSimilar(task);
        if (similar.size() == 0) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(similar, HttpStatus.OK);
    }


}
