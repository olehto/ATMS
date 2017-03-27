package com.atms.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;


@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "projectId")
public class Project {
    private int projectId;
    private String title;
    private String description;
    private Timestamp dateStart;
    private Timestamp deadline;
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "sprintId")
    @JsonIdentityReference(alwaysAsId = true)
    private Set<Sprint> sprints;
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "requirementId")
    @JsonIdentityReference(alwaysAsId = true)
    private Set<Requirement> requirements;

    @Id
    @GeneratedValue
    @Column(name = "project_id")
    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    @Column(name = "title", nullable = false)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Column(name = "description", nullable = false)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Column(name = "date_start")
    public Timestamp getDateStart() {
        return dateStart;
    }

    public void setDateStart(Timestamp dateStart) {
        this.dateStart = dateStart;
    }

    @Column(name = "deadline", nullable = false)
    public Timestamp getDeadline() {
        return deadline;
    }

    public void setDeadline(Timestamp deadline) {
        this.deadline = deadline;
    }

    @OneToMany(mappedBy = "project")
    public Set<Sprint> getSprints() {
        return sprints;
    }

    public void setSprints(Set<Sprint> sprints) {
        this.sprints = sprints;
    }

    @ManyToMany
    @JoinTable(joinColumns = @JoinColumn(name = "requirement_id"), inverseJoinColumns = @JoinColumn(name = "project_id"))
    public Set<Requirement> getRequirements() {
        return requirements;
    }

    public void setRequirements(Set<Requirement> requirements) {
        this.requirements = requirements;
    }
}
