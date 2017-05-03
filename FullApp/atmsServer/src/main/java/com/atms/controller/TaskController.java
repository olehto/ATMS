package com.atms.controller;

import com.atms.model.*;
import com.atms.service.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@CrossOrigin
@RestController
public class TaskController {

    private final TaskService taskService;
    private final ProjectService projectService;
    private final StatusService statusService;
    private final PriorityService priorityService;
    private final DescriptionSimilarity descriptionSimilarity;
    private final TypeService typeService;
    private final DeveloperService developerService;
    private final SprintService sprintService;

    @Autowired
    public TaskController(ProjectService projectService, StatusService statusService,
                          PriorityService priorityService, TaskService taskService,
                          DescriptionSimilarity descriptionSimilarity, TypeService typeService,
                          DeveloperService developerService,SprintService sprintService) {
        this.projectService = projectService;
        this.statusService = statusService;
        this.priorityService = priorityService;
        this.taskService = taskService;
        this.typeService = typeService;
        this.descriptionSimilarity = descriptionSimilarity;
        this.developerService = developerService;
        this.sprintService=sprintService;
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
    public ResponseEntity<Task> add(@RequestParam("title") String title,
                                    @RequestParam("description") String description,
                                    @RequestParam("dateStart") String dateStart,
                                    @RequestParam("deadline") String deadline,
                                    @RequestParam("version") String version,
                                    @RequestParam("priority") Integer priorityId,
                                    @RequestParam("type") Integer typeId,
                                    @RequestParam("status") Integer statusId,
                                    @RequestParam("duration") Time duration,
                                    @RequestParam("developer") Integer developerId,
                                    @RequestParam("reporter") Integer reporterId,
                                    @RequestParam("project") Integer projectId){
        Task task = new Task();
        task.setTitle(title);
        task.setDescription(description);
        task.setDateStart(new Timestamp(System.currentTimeMillis()));
        task.setDeadline(new Timestamp(System.currentTimeMillis()+100000000));
        task.setVersion(version);
        task.setDuration(duration);
        task.setPriority(priorityService.findOne(priorityId));
        task.setType(typeService.findOne(typeId));
        task.setStatus(statusService.findOne(statusId));
        Sprint sprint=new Sprint();
        sprint.setDateStart(task.getDateStart());
        sprint.setDateEnd(task.getDeadline());
        sprint.setProject(projectService.findOne(projectId));
        task.setSprint(sprintService.save(sprint));
        task.setDeveloper(developerService.findOne(developerId));
        task.setReporter(developerService.findOne(reporterId));
        return new ResponseEntity<>(taskService.save(task), HttpStatus.OK);
    }

    @RequestMapping(value = "/api/task/{taskId}", method = RequestMethod.POST)
    public ResponseEntity<Task> update(@PathVariable("taskId") String taskId,
                                       @RequestParam("title") String title,
                                    @RequestParam("description") String description,
                                    @RequestParam("dateStart") String dateStart,
                                    @RequestParam("deadline") String deadline,
                                    @RequestParam("version") String version,
                                    @RequestParam("priority") Integer priorityId,
                                    @RequestParam("type") Integer typeId,
                                    @RequestParam("status") Integer statusId,
                                    @RequestParam("duration") Time duration,
                                    @RequestParam("developer") Integer developerId,
                                    @RequestParam("reporter") Integer reporterId,
                                    @RequestParam("project") Integer projectId){
        Task task = taskService.findOne(Integer.parseInt(taskId));
        task.setTitle(title);
        task.setDescription(description);
        task.setDateStart(new Timestamp(System.currentTimeMillis()));
        task.setDeadline(new Timestamp(System.currentTimeMillis()+100000000));
        task.setVersion(version);
        task.setDuration(duration);
        task.setPriority(priorityService.findOne(priorityId));
        task.setType(typeService.findOne(typeId));
        task.setStatus(statusService.findOne(statusId));
        Sprint sprint=new Sprint();
        sprint.setDateStart(task.getDateStart());
        sprint.setDateEnd(task.getDeadline());
        sprint.setProject(projectService.findOne(projectId));
        task.setSprint(sprintService.save(sprint));
        task.setDeveloper(developerService.findOne(developerId));
        task.setReporter(developerService.findOne(reporterId));
        return new ResponseEntity<>(taskService.update(Integer.parseInt(taskId),task), HttpStatus.OK);
    }

    /*@RequestMapping(value = "/api/task/", method = RequestMethod.POST)
    public ResponseEntity<Task> add(@RequestBody String body) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Task task = (Task) mapper.readValue(body, Task.class);
            //task.setDeveloper(developerService.findOne(1));
            task.setSubtasks(new HashSet<Task>());
            task.setDocuments(new HashSet<Document>());
            task.setLogs(new HashSet<Log>());
            task = taskService.save(task);
            return new ResponseEntity<>(task, HttpStatus.OK);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/api/task/{taskId}", method = RequestMethod.POST)
    public ResponseEntity<Task> update(@RequestBody String body, @PathVariable("taskId") String taskId) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Task task = (Task) mapper.readValue(body, Task.class);
            task = taskService.update(Integer.parseInt(taskId), task);
            if (task == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(task, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
*/
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

        @RequestMapping(value = "/api/task/search/title", method = RequestMethod.POST)
     public ResponseEntity<List<Task>> getByTitleContaining(@RequestParam("title") String title) {
                List<Task> tasks = taskService.findByTitleContaining(title);
                if (tasks.size() == 0)
                        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
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
}
