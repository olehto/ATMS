package com.atms.model;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by alex on 3/15/2017.
 */
@Entity
@Table(name = "functional_requirements", schema = "atms", catalog = "")
public class Requirement {
    private int requirementId;
    private String title;
    private String description;
    private Set<Task> tasks;

    @Id
    @Column(name = "requirement_id")
    public int getRequirementId() {
        return requirementId;
    }

    public void setRequirementId(int requirementId) {
        this.requirementId = requirementId;
    }


    @Column(name = "Title")
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    @Column(name = "Description")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @ManyToMany
    @JoinTable(joinColumns = @JoinColumn(name = "task_id"), inverseJoinColumns = @JoinColumn(name = "requirement_id"))
    public Set<Task> getTasks() {
        return tasks;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }
}
