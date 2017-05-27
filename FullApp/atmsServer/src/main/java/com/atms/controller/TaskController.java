package com.atms.controller;

import com.atms.model.*;
import com.atms.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.http.HttpStatus.OK;


@RestController
@CrossOrigin
public class TaskController {

    private final TaskService taskService;
    private final ProjectService projectService;
    private final StatusService statusService;
    private final PriorityService priorityService;
    private final TypeService typeService;
    private final DeveloperService developerService;
    private final SprintService sprintService;
    private final RequirementService requirementService;

    @Autowired
    public TaskController(ProjectService projectService, StatusService statusService,
                          PriorityService priorityService, TaskService taskService, TypeService typeService,
                          DeveloperService developerService,SprintService sprintService,
                          RequirementService requirementService) {
        this.projectService = projectService;
        this.statusService = statusService;
        this.priorityService = priorityService;
        this.taskService = taskService;
        this.typeService = typeService;
        this.developerService = developerService;
        this.sprintService=sprintService;
        this.requirementService = requirementService;
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
        return new ResponseEntity<>(tasks, OK);
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

    @RequestMapping(value = "/api/task/{taskId}", method = RequestMethod.POST)
    public ResponseEntity<Task> update(@PathVariable("taskId") String taskId,
                                       @RequestParam("title") String title,
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
                                       @RequestParam("parent_id") Integer parentId){
        Task task = taskService.findOne(Integer.parseInt(taskId));
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
        return new ResponseEntity<>(taskService.update(Integer.parseInt(taskId),task), HttpStatus.OK);
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


    @RequestMapping(value = "/api/task/search/start", method = RequestMethod.POST)
    public ResponseEntity<List<Task>> getStartTimeGreater(@RequestParam("start") Long start,
                                                          @RequestParam("developer") String dev){
        Developer developer = developerService.findOne(Integer.parseInt(dev));
        if (developer == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Task> tasks = taskService.findByStartTimeGreaterAndDeveloper(new Timestamp(start),developer);
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
    @RequestMapping(value = "/api/task/developer/{developerId}", method = RequestMethod.GET)
    public ResponseEntity<List<Task>> getByDeveloper(@PathVariable("developerId") String developerId) {
        Developer developer = developerService.findOne(Integer.parseInt(developerId));
        if (developer == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Task> tasks = taskService.findByDeveloper(developer);
        if (tasks == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }
    @RequestMapping(value = "/api/task/take", method = RequestMethod.POST)
    public ResponseEntity<Task> getByDeveloper(@RequestParam("developerId") String devId,
                                               @RequestParam("taskId") String taskId) {
        Developer developer = developerService.findOne(Integer.parseInt(devId));
        Task task=taskService.findOne(Integer.parseInt(taskId));
        if (developer == null||task==null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        task.setDeveloper(developer);
        return new ResponseEntity<>(taskService.save(task), HttpStatus.OK);
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
