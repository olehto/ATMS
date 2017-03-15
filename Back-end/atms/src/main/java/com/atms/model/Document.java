package com.atms.model;

import javax.persistence.*;
import java.util.Set;


@Entity
public class Document {
    private int documentId;
    private String link;
    private Set<Task> tasks;

    @Id
    @Column(name = "document_id")
    public int getDocumentId() {
        return documentId;
    }

    public void setDocumentId(int documentId) {
        this.documentId = documentId;
    }


    @Column(name = "link")
    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    @ManyToMany
    @JoinTable(joinColumns = @JoinColumn(name = "document_id"), inverseJoinColumns = @JoinColumn(name = "task_id"))
    public Set<Task> getTasks() {
        return tasks;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }
}
