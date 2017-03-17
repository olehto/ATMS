package com.atms.controller;


import com.atms.model.Document;
import com.atms.service.DocumentService;
import com.atms.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DocumentController {

    private final DocumentService documentService;

    private final TaskService taskService;

    @Autowired
    public DocumentController(DocumentService documentService, TaskService taskService) {
        this.documentService = documentService;
        this.taskService = taskService;
    }

    @RequestMapping(value = "/document", method = RequestMethod.GET)
    public List<Document> getAllDocument() {
        return documentService.findAll();
    }

    @RequestMapping(value = "/document/task/{taskId}", method = RequestMethod.GET)
    public List<Document> getDocumentByTask(@PathVariable("taskId") String taskId) {
        return documentService.findByTask(taskService.findOne(Integer.parseInt(taskId)));
    }
}
