package com.atms.repository;

import com.atms.model.Document;
import com.atms.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by alex on 3/15/2017.
 */
@Repository
public interface DocumentRepository extends JpaRepository<Document, Integer> {

    public List<Document> findByTask(Task task);
}
