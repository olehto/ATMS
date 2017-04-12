package com.atms.service;

import com.atms.model.Task;

import java.util.Set;

/**
 * @author Alex Kazanovskiy.
 */
public interface IntersectionService {
    /**
     * Returns set of task by intersection of requirement and technology of given task and finished tasks
     */
    Set<Task> getTop(Task task);
}
