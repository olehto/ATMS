package com.atms.service;

import com.atms.model.Document;
import com.atms.model.Task;

import java.util.List;

/**
 * Created by alex on 3/15/2017.
 */
public interface DocumentService {
    Document save(Document document);

    Document update(Document document);

    Document findOne(Integer id);

    List<Document> findAll();

    List<Document> findByTask(Task task);

    void delete(Document document);
}
