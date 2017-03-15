package com.atms.model;

import javax.persistence.*;
import java.util.Collection;
import java.util.Set;

/**
 * Created by alex on 3/15/2017.
 */
@Entity
public class Type {
    private String typeId;
    private String typeValue;
    private Set<Task> tasks;

    @Id
    @Column(name = "type_id")
    public String getTypeId() {
        return typeId;
    }

    public void setTypeId(String typeId) {
        this.typeId = typeId;
    }

    @Column(name = "type_value")
    public String getTypeValue() {
        return typeValue;
    }

    public void setTypeValue(String typeValue) {
        this.typeValue = typeValue;
    }


    @OneToMany(mappedBy = "type")
    public Set<Task> getTasks() {
        return tasks;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }
}
