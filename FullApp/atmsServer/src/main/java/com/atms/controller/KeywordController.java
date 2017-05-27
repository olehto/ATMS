package com.atms.controller;

import com.atms.model.Keyword;
import com.atms.model.Sprint;
import com.atms.model.TaskKeyword;
import com.atms.service.KeywordService;
import com.atms.service.TaskKeywordService;
import com.atms.service.TaskService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * @author Alex Kazanovskiy.
 */

@RestController
@CrossOrigin
public class KeywordController {

    private final KeywordService keywordService;
    private final TaskKeywordService taskKeywordService;
    private final TaskService taskService;

    @Autowired
    public KeywordController(KeywordService keywordService,
                             TaskKeywordService taskKeywordService,TaskService taskService) {
        this.taskKeywordService=taskKeywordService;
        this.keywordService = keywordService;
        this.taskService=taskService;
    }

    @RequestMapping(value = "/api/keyword", method = RequestMethod.GET)
    public ResponseEntity<List<Keyword>> getAll() {
        List<Keyword> keywords = keywordService.findAll();
        if (keywords == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(keywords, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/keyword/{keywordId}", method = RequestMethod.GET)
    public ResponseEntity<Keyword> get(@PathVariable("keywordId") String keywordId) {
        Keyword keyword = keywordService.findOne(Integer.parseInt(keywordId));
        if (keyword == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(keyword, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/keyword", method = RequestMethod.POST)
    public ResponseEntity<TaskKeyword> add(@RequestParam("value") String value, @RequestParam("importance") double imp,
                                       @RequestParam("taskId") int taskId) {
        Keyword temp = keywordService.findByValue(value);
        TaskKeyword tk = new TaskKeyword();
        tk.setImportance(imp);
        tk.setTask(taskService.findOne(taskId));
        if (temp == null) {
            temp = new Keyword();
            temp.setValue(value);
            temp = keywordService.save(temp);
        }
        tk.setKeyword(temp);
        tk= taskKeywordService.save(tk);
        return new ResponseEntity<>(tk, HttpStatus.OK);
    }



    @RequestMapping(value = "/api/keyword/{keywordId}", method = RequestMethod.PUT)
    public ResponseEntity<Keyword> update(@Valid Keyword keyword, @PathVariable("keywordId") String keywordId) {
        Keyword oldKeyword = keywordService.findOne(Integer.parseInt(keywordId));
        if (oldKeyword == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        oldKeyword.setValue(keyword.getValue());
        // oldKeyword.setTasks(keyword.getTasks());
        return new ResponseEntity<>(keywordService.update(oldKeyword), HttpStatus.OK);
    }

    @RequestMapping(value = "/api/keyword/{keywordId}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable("keywordId") String keywordId) {
        if (keywordService.delete(Integer.parseInt(keywordId))) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
