package com.atms.repository;

import com.atms.model.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SprintRepository extends JpaRepository<Sprint, Integer> {
}
