package com.atms.service.impl;

import com.atms.model.Requirement;
import com.atms.model.Task;
import com.atms.model.Technology;
import com.atms.repository.TaskRepository;
import com.atms.service.IntersectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author Alex Kazanovskiy.
 */

@Service
public class IntersectionServiceImpl implements IntersectionService {

    private final TaskRepository taskRepository;

    @Autowired
    public IntersectionServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public Set<Task> getTop(Task task) {
        List<Task> allTasks = taskRepository.findAllByDeveloperIsNotNull();
        List<Task> intersectionByRequirement = new ArrayList<>();
        List<Requirement> requirements = new ArrayList<>();

        for (Task t : allTasks) {
            if (t.getRequirement().getKeywords().stream().filter(task.getRequirement()
                    .getKeywords()::contains).collect(Collectors.toList()).size() != 0)
                requirements.add(t.getRequirement());
        }

        for (Requirement requirement : requirements) {
            intersectionByRequirement.addAll(requirement.getTasks());
        }

        Set<Task> intersectionByRequirementAndTechnology = new HashSet<>();
        for (Task t : intersectionByRequirement) {
            for (Technology technology : t.getRequirement().getTechnologies()) {
                for (Technology technology1 : task.getRequirement().getTechnologies()) {
                    if (technology.getKeywords().stream()
                            .filter(technology1.getKeywords()::contains).collect(Collectors.toList()).size() != 0)
                        intersectionByRequirementAndTechnology.add(t);
                }
            }
        }
        return intersectionByRequirementAndTechnology;
    }
}
