package com.atms.service;

import com.atms.model.Document;

import java.util.List;

/**
 * Created by alex on 3/15/2017.
 */
public interface DocumentService {
    Document save(Document document);

    Document update(Document document);

    Document findOne(Integer id);

    List<Document> findAll();

    boolean delete(Integer id);
}
