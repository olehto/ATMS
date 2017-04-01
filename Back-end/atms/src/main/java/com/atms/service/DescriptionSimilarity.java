package com.atms.service;

import com.atms.model.Task;

import java.util.Map;

/**
 * @author Alex Kazanovskiy.
 */
public interface DescriptionSimilarity {
    int SHINGLE_LENGTH = 4;

    Map<Integer, Integer> findSimilar(Task task);

}
