package com.atms.service;

import com.atms.model.Task;

import java.util.Set;

/**
 * @author Alex Kazanovskiy.
 */
public interface IntersectionService {

    Set<Task> getTop(Task task);
}
