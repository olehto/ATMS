package com.atms.service.impl;

import com.atms.model.Document;
import com.atms.model.Task;
import com.atms.repository.DocumentRepository;
import com.atms.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by alex on 3/15/2017.
 */
@Service
public class DocumentServiceImpl implements DocumentService {

    private final DocumentRepository documentRepository;

    @Autowired
    public DocumentServiceImpl(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    @Override
    public Document save(Document document) {
        return documentRepository.saveAndFlush(document);
    }

    @Override
    public Document update(Document document) {
        return documentRepository.saveAndFlush(document);
    }

    @Override
    public Document findOne(Integer id) {
        return documentRepository.findOne(id);
    }

    @Override
    public List<Document> findAll() {
        return documentRepository.findAll();
    }

    @Override
    public List<Document> findByTask(Task task) {
        return documentRepository.findByTask(task);
    }

    @Override
    public void delete(Document document) {
        documentRepository.delete(document);
    }
}
