package com.atms.controller;

import com.atms.model.Priority;
import com.atms.model.Project;
import com.atms.model.Status;
import com.atms.model.Task;
import com.atms.service.PriorityService;
import com.atms.service.ProjectService;
import com.atms.service.StatusService;
import com.atms.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;


@RestController
public class TaskController {

    private final TaskService taskService;

    private final ProjectService projectService;

    private final StatusService statusService;

    private final PriorityService priorityService;

    @Autowired
    public TaskController(ProjectService projectService, StatusService statusService, PriorityService priorityService, TaskService taskService) {
        this.projectService = projectService;
        this.statusService = statusService;
        this.priorityService = priorityService;
        this.taskService = taskService;
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
        Task oldTask = taskService.findOne(Integer.parseInt(taskId));
        if (oldTask == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        oldTask.setTitle(task.getTitle());
        oldTask.setDescription(task.getDescription());
        oldTask.setDateStart(task.getDateStart());
        oldTask.setDeadline(task.getDeadline());
        oldTask.setVersion(task.getVersion());
        oldTask.setStartTime(task.getStartTime());
        oldTask.setEndTime(task.getEndTime());
        oldTask.setParent(task.getParent());
        oldTask.setSubtasks(task.getSubtasks());
        oldTask.setPriority(task.getPriority());
        oldTask.setType(task.getType());
        oldTask.setStatus(task.getStatus());
        oldTask.setSprint(task.getSprint());
        oldTask.setDeveloper(task.getDeveloper());
        oldTask.setDocuments(task.getDocuments());
        oldTask.setKeywords(task.getKeywords());
        return new ResponseEntity<>(taskService.update(oldTask), HttpStatus.OK);
    }

    @RequestMapping(value = "/api/task/{taskId}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable("taskId") String taskId) {
        if (taskService.delete(Integer.parseInt(taskId))) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
