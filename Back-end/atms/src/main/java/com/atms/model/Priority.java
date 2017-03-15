package com.atms.model;

import javax.persistence.*;
import java.util.Collection;
import java.util.Set;

/**
 * Created by alex on 3/15/2017.
 */
@Entity
public class Priority {
    private int priorityId;
    private String priorityValue;
    private Set<Task> tasks;

    @Id
    @Column(name = "priority_id")
    public int getPriorityId() {
        return priorityId;
    }

    public void setPriorityId(int priorityId) {
        this.priorityId = priorityId;
    }

    @Column(name = "priority_value")
    public String getPriorityValue() {
        return priorityValue;
    }

    public void setPriorityValue(String priorityValue) {
        this.priorityValue = priorityValue;
    }


    @OneToMany(mappedBy = "priority")
    public Set<Task> getTasks() {
        return tasks;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }
}
