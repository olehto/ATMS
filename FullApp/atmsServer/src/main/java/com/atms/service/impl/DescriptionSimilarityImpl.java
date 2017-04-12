package com.atms.service.impl;

import com.atms.model.Task;
import com.atms.service.DescriptionSimilarity;
import com.atms.service.IntersectionService;
import info.debatty.java.stringsimilarity.Cosine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * @author Alex Kazanovskiy.
 */
@Service
public class DescriptionSimilarityImpl implements DescriptionSimilarity {
    private final IntersectionService intersectionService;

    @Autowired
    public DescriptionSimilarityImpl(IntersectionService intersectionService) {
        this.intersectionService = intersectionService;
    }

    @Override
    public Map<Integer, Integer> findSimilar(Task task) {
        List<Task> tasks = new ArrayList<>(intersectionService.getTop(task));
        Map<Integer, Integer> descriptions = new HashMap<>();
        Cosine cosine = new Cosine(DescriptionSimilarity.SHINGLE_LENGTH);
        for (Task t : tasks) {
            descriptions.put(t.getTaskId(), (int) (cosine.similarity(task.getDescription(), t.getDescription()) * 100));
        }
        return sortByValue(descriptions);
    }

    private Map<Integer, Integer> sortByValue(Map<Integer, Integer> descriptions) {
        List<Map.Entry<Integer, Integer>> entries = new LinkedList<>(descriptions.entrySet());
        entries.sort(Comparator.comparing(Map.Entry::getValue));
        Map<Integer, Integer> result = new LinkedHashMap<>();
        for (Map.Entry<Integer, Integer> entry : entries) {
            result.put(entry.getKey(), entry.getValue());
        }
        return result;
    }
}
