package com.atms.model;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by alex on 3/15/2017.
 */
@Entity
public class Keyword {
    private int keywordId;
    private String value;
    private Set<Task> tasks;

    @Id
    @Column(name = "keyword_id")
    public int getKeywordId() {
        return keywordId;
    }

    public void setKeywordId(int keywordId) {
        this.keywordId = keywordId;
    }

    @Column(name = "value")
    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @ManyToMany
    @JoinTable(joinColumns = @JoinColumn(name = "keyword_id"), inverseJoinColumns = @JoinColumn(name = "task_id"))
    public Set<Task> getTasks() {
        return tasks;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }
}
