package com.atms.repository;

import com.atms.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by alex on 3/15/2017.
 */
public interface DocumentRepository extends JpaRepository<Document, Integer> {
}
