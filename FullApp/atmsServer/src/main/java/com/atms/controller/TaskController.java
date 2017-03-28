package com.atms.controller;

import com.atms.model.*;
import com.atms.service.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
public class TaskController {

    private final TaskService taskService;

    private final ProjectService projectService;

    private final StatusService statusService;

    private final PriorityService priorityService;

    private final TypeService typeService;

    @Autowired
    public TaskController(ProjectService projectService, StatusService statusService, PriorityService priorityService, TaskService taskService, TypeService typeService) {
        this.projectService = projectService;
        this.statusService = statusService;
        this.priorityService = priorityService;
        this.taskService = taskService;
        this.typeService=typeService;
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
    public ResponseEntity<List<Task>> getByProjectAndStatus(@PathVariable("projectId") String projectId, @PathVariable("statusId") String statusId) {
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

    @RequestMapping(value = "/api/task/status/{statusId}", method = RequestMethod.GET)
    public ResponseEntity<List<Task>> getByStatus(@PathVariable("statusId") String statusId) {
        Status status = statusService.findOne(Integer.parseInt(statusId));
        if (status == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Task> tasks = taskService.findByStatus(status);
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

    @RequestMapping(value = "/api/task/priority/{priorityId}", method = RequestMethod.GET)
    public ResponseEntity<List<Task>> getByPriority(@PathVariable("priorityId") String priorityId) {
        Priority priority = priorityService.findOne(Integer.parseInt(priorityId));
        if (priority == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Task> tasks = taskService.findByPriority(priority);
        if (tasks == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/task/type/{typeId}", method = RequestMethod.GET)
    public ResponseEntity<List<Task>> getByType(@PathVariable("typeId") String typeId) {
        Type type = typeService.findOne(Integer.parseInt(typeId));
        if (type == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Task> tasks = taskService.findByType(type);
        if (tasks == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/task", method = RequestMethod.POST)
    public ResponseEntity<Task> add(@RequestBody String body) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Task task = (Task) mapper.readValue(body, Task.class);
            task = taskService.save(task);
            return new ResponseEntity<>(taskService.save(task), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/api/task/{taskId}", method = RequestMethod.PUT)
    public ResponseEntity<Task> update(@RequestBody String body, @PathVariable("taskId") String taskId) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Task task = (Task) mapper.readValue(body, Task.class);
            Task oldTask = taskService.findOne(Integer.parseInt(taskId));
            if (oldTask == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
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
            // oldTask.setKeywords(task.getKeywords());
            return new ResponseEntity<>(taskService.update(oldTask), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/api/task/epic/{taskId}", method = RequestMethod.GET)
    public ResponseEntity<List<Task>> getByParentTask(@PathVariable("taskId") String taskId) {
        Task task = taskService.findOne(Integer.parseInt(taskId));
        if (task == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Task> tasks = taskService.findByParent(task);
        if (tasks == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

}
