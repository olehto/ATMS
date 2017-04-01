package com.atms.service.impl;

import com.atms.model.Task;
import com.atms.repository.TaskRepository;
import com.atms.service.DescriptionSimilarity;
import info.debatty.java.stringsimilarity.Cosine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Alex Kazanovskiy.
 */
@Service
public class DescriptionSimilarityImpl implements DescriptionSimilarity {
    private final TaskRepository taskRepository;

    @Autowired
    public DescriptionSimilarityImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public Map<Integer, Integer> findSimilar(Task task) {
        List<Task> tasks = taskRepository.findAllByDeveloperIsNotNull();
        Map<Integer, Integer> descriptions = new HashMap<>();
        Cosine cosine = new Cosine(DescriptionSimilarity.SHINGLE_LENGTH);
        for (Task t : tasks) {
            descriptions.put(t.getTaskId(), (int) (cosine.similarity(task.getDescription(), t.getDescription()) * 100));
        }
        return descriptions;
    }
}
