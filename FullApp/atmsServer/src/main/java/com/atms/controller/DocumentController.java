package com.atms.controller;


import com.atms.model.Document;
import com.atms.model.Task;
import com.atms.service.DocumentService;
import com.atms.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController
public class DocumentController {

    private static String UPLOADED_FOLDER = "F://temp//";
    private final DocumentService documentService;
    private final TaskService taskService;


    @Autowired
    public DocumentController(DocumentService documentService, TaskService taskService) {
        this.documentService = documentService;
        this.taskService = taskService;
    }

    @RequestMapping(value = "/api/document", method = RequestMethod.GET)
    public ResponseEntity<List<Document>> getAllDocument() {
        List<Document> documents = documentService.findAll();
        if (documents == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/document/task/{taskId}", method = RequestMethod.GET)
    public ResponseEntity<Set<Document>> getDocumentByTask(@PathVariable("taskId") String taskId) {
        Task task = taskService.findOne(Integer.parseInt(taskId));
        if (task == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Set<Document> documents = task.getDocuments();

        if (documents == null)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/document/task/{taskId}", method = RequestMethod.POST, params = "file")
    public ResponseEntity<Document> add(@RequestParam("file") MultipartFile file,
                                        @PathVariable("taskId") String taskId) {
        try {
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
            Files.write(path, bytes);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Document document = new Document();
        document.setLink(UPLOADED_FOLDER + file.getOriginalFilename());
        document.setTask(taskService.findOne(Integer.parseInt(taskId)));
        return new ResponseEntity<>(documentService.save(document), HttpStatus.OK);
    }

    @RequestMapping(value = "/api/document/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable("id") String id) {
        Document document = documentService.findOne(Integer.parseInt(id));
        if (document == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Path path = Paths.get(document.getLink());
        try {
            Files.write(path, new byte[]{0});
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
