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
import java.sql.Timestamp;
import java.util.List;

import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.http.HttpStatus.OK;

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

    private final RequirementService requirementService;
    private final TypeService typeService;
    private final SprintService sprintService;
    private final DeveloperService developerService;

    @Autowired
    public TaskController(ProjectService projectService, StatusService statusService,
                          PriorityService priorityService, TaskService taskService,
                          RequirementService requirementService,
                          TypeService typeService, SprintService sprintService,
                          DeveloperService developerService) {
        this.projectService = projectService;
        this.statusService = statusService;
        this.priorityService = priorityService;
        this.taskService = taskService;
        this.requirementService = requirementService;
        this.typeService = typeService;
        this.sprintService = sprintService;
        this.developerService = developerService;
    }

    @RequestMapping(value = "/api/task", method = RequestMethod.GET)
    public ResponseEntity<List<Task>> getAll() {
        List<Task> tasks = taskService.findAll();
        if (tasks == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(tasks, OK);
    }

    @RequestMapping(value = "/api/task/{id}", method = RequestMethod.GET)
    public ResponseEntity<Task> get(@PathVariable("id") String id) {
        Task task = taskService.findOne(Integer.parseInt(id));
        if (task == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(task, OK);
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
        return new ResponseEntity<>(tasks, OK);
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
        return new ResponseEntity<>(tasks, OK);
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
        return new ResponseEntity<>(tasks, OK);
    }


    @RequestMapping(value = "/api/task", method = RequestMethod.POST)
    public ResponseEntity<Task> add(@RequestParam("title") String title,
                                    @RequestParam("description") String description,
                                    @RequestParam("date_start") Timestamp dateStart,
                                    @RequestParam("deadline") Timestamp deadline,
                                    @RequestParam("version") String version,
                                    @RequestParam("priority_id") Integer priorityId,
                                    @RequestParam("type_id") Integer typeId,
                                    @RequestParam("status_id") Integer statusId,
                                    @RequestParam("assignedTime") Timestamp assignedTime,
                                    @RequestParam("closeTime") Timestamp closeTime,
                                    @RequestParam("sprint_id") Integer sprintId,
                                    @RequestParam("developer_id") Integer developerId,
                                    @RequestParam("reporter_id") Integer reporterId,
                                    @RequestParam("requirement_id") Integer requirementId,
                                    @RequestParam("parent_id") Integer parentId) {
        Task task = new Task();
        task.setTitle(title);
        task.setDescription(description);
        task.setDateStart(dateStart);
        task.setDeadline(deadline);
        task.setVersion(version);
        task.setAssignedTime(assignedTime);
        task.setCloseTime(closeTime);
        task.setPriority(priorityService.findOne(priorityId));
        task.setType(typeService.findOne(typeId));
        task.setStatus(statusService.findOne(statusId));
        task.setSprint(sprintService.findOne(sprintId));
        task.setDeveloper(developerService.findOne(developerId));
        task.setReporter(developerService.findOne(reporterId));
        task.setRequirement(requirementService.findOne(requirementId));
        task.setParent(taskService.findOne(parentId));
        return new ResponseEntity<>(taskService.save(task), OK);
    }

    @RequestMapping(value = "/api/task/{taskId}", method = RequestMethod.PUT)
    public ResponseEntity<Task> update(@Valid Task task, @PathVariable("taskId") String taskId) {
        task = taskService.update(Integer.parseInt(taskId), task);
        if (task == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(task, OK);
    }

    @RequestMapping(value = "/api/task/search/start", method = RequestMethod.GET)
    public ResponseEntity<List<Task>> getStartTimeGreater(@RequestParam("start") Timestamp start,
                                                          @RequestParam("end") Timestamp end) {
        List<Task> tasks = taskService.findByStartTimeInInterval(start, end);
        if (tasks.size() == 0) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(tasks, OK);
    }

    @RequestMapping(value = "/api/task/search/title", method = RequestMethod.GET)
    public ResponseEntity<List<Task>> getByTitleContaining(@RequestParam("title") String title) {
        List<Task> tasks = taskService.findByTitleContaining(title);
        if (tasks.size() == 0)
            return new ResponseEntity<>(NO_CONTENT);
        return new ResponseEntity<>(tasks, OK);
    }

    @RequestMapping(value = "/api/task/close/{taskId}", method = RequestMethod.POST)
    public ResponseEntity<Task> close(@PathVariable("taskId") String taskId, @RequestParam("closeTime") Timestamp closeTime) {
        Task task = taskService.findOne(Integer.parseInt(taskId));
        if (task == null)
            return new ResponseEntity<>(NO_CONTENT);
        task.setCloseTime(closeTime);
        return new ResponseEntity<>(taskService.close(task), OK);
    }


}
