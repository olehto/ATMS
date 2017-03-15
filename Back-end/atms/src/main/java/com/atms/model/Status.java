package com.atms.model;

import javax.persistence.*;
import java.util.Collection;
import java.util.Set;

/**
 * Created by alex on 3/15/2017.
 */
@Entity
public class Status {
    private int statusId;
    private String value;
    private Set<Task> tasks;

    @Id
    @Column(name = "status_id")
    public int getStatusId() {
        return statusId;
    }

    public void setStatusId(int statusId) {
        this.statusId = statusId;
    }


    @Column(name = "value")
    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }


    @OneToMany(mappedBy = "status")
    public Set<Task> getTasks() {
        return tasks;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }
}
