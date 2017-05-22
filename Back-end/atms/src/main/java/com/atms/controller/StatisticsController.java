package com.atms.controller;

import com.atms.model.Developer;
import com.atms.model.Task;
import com.atms.service.DeveloperService;
import com.atms.service.StatisticsService;
import com.atms.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * @author Alex Kazanovskiy.
 */
@RestController
public class StatisticsController {

    private final StatisticsService statisticsService;
    private TaskService taskService;
    private DeveloperService developerService;

    @Autowired
    public StatisticsController(StatisticsService statisticsService, TaskService taskService, DeveloperService developerService) {
        this.statisticsService = statisticsService;
        this.taskService = taskService;
        this.developerService = developerService;
    }

    @RequestMapping(value = "/api/statistics/{taskId}", method = RequestMethod.GET)
    public ResponseEntity<Developer> getSuitableDeveloper(@PathVariable("taskId") String taskid) {
        Task task = taskService.findOne(Integer.parseInt(taskid));
        Developer developer = statisticsService.getSuitableDeveloper(task);
        return new ResponseEntity<>(developer, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/statistics", method = RequestMethod.POST)
    public ResponseEntity<Map<Integer, Integer>> getSuitableMap(@RequestBody List<Integer> developers,
                                                                List<Integer> tasks) {
        List<Developer> developerList = developerService.findAll(developers);
        List<Task> taskList = taskService.findAll(tasks);
        return new ResponseEntity<>(statisticsService.getSuitableMap(developerList, taskList), HttpStatus.OK);
    }
}
