package com.atms.service;

import com.atms.model.Task;

import java.util.Map;

/**
 * @author Alex Kazanovskiy.
 */
public interface DescriptionSimilarity {
    int SHINGLE_LENGTH = 2;
    /**
     * Returns Map of <Integer, Integer> where key value is a field taskId of {@link Task} and value is
     * percent of description similarity with given task
     *
     * @param task object of class {@link Task}
     */
    Map<Integer, Integer> findSimilar(Task task);

}
