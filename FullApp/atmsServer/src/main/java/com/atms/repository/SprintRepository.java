package com.atms.repository;

import com.atms.model.Project;
import com.atms.model.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * DAO class for interaction between application and Task table in DB
 * @author Alex Kazanovskiy
 */
public interface SprintRepository extends JpaRepository<Sprint, Integer> {

    /**
     * @return list of Sprint where sprint's project equals @value
     */
    List<Sprint> findAllByProject(Project project);
}
