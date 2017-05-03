package com.atms.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.Set;


@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "sprintId")
public class Sprint {
    private int sprintId;
    private Timestamp dateStart;
    private Timestamp dateEnd;
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "projectId")
    @JsonIdentityReference(alwaysAsId = true)
    private Project project;

    private Set<Task> tasks;

    @Id
    @GeneratedValue
    @Column(name = "sprint_id")
    public int getSprintId() {
        return sprintId;
    }

    public void setSprintId(int sprintId) {
        this.sprintId = sprintId;
    }

    @Column(name = "date_start", nullable = false)
    public Timestamp getDateStart() {
        return dateStart;
    }

    public void setDateStart(Timestamp dateStart) {
        this.dateStart = dateStart;
    }

    @Column(name = "date_end", nullable = false)
    public Timestamp getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(Timestamp dateEnd) {
        this.dateEnd = dateEnd;
    }

    @ManyToOne
    @JoinColumn(name = "project_id", referencedColumnName = "project_id", updatable = false, insertable = false)
    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    @OneToMany(mappedBy = "sprint")
    public Set<Task> getTasks(){return tasks;}

    public void setTasks(Set<Task> tasks){
        this.tasks = tasks;
    }

}
