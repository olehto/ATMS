package com.atms.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.Set;


@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "requirementId")
@Table(name = "requirements")
public class Requirement {
    private int requirementId;
    private String title;
    private String description;
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "taskId")
    @JsonIdentityReference(alwaysAsId = true)
    private Set<Task> tasks;
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "keywordId")
    @JsonIdentityReference(alwaysAsId = true)
    private Set<Keyword> keywords;
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "technologyId")
    @JsonIdentityReference(alwaysAsId = true)
    private Set<Technology> technologies;
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "projectId")
    @JsonIdentityReference(alwaysAsId = true)
    private Set<Project> projects;

    @Id
    @GeneratedValue
    @Column(name = "requirement_id")
    public int getRequirementId() {
        return requirementId;
    }

    public void setRequirementId(int requirementId) {
        this.requirementId = requirementId;
    }

    @Column(name = "Title", nullable = false)
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

    @OneToMany(mappedBy = "requirement")
    public Set<Task> getTasks() {
        return tasks;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }

    @ManyToMany(mappedBy = "requirements")
    public Set<Keyword> getKeywords() {
        return keywords;
    }

    public void setKeywords(Set<Keyword> keywords) {
        this.keywords = keywords;
    }

    @ManyToMany(mappedBy = "requirements")
    public Set<Technology> getTechnologies() {
        return technologies;
    }

    public void setTechnologies(Set<Technology> technologies) {
        this.technologies = technologies;
    }

    @ManyToMany(mappedBy = "requirements")
    public Set<Project> getProjects() {
        return projects;
    }

    public void setProjects(Set<Project> projects) {
        this.projects = projects;
    }
}
