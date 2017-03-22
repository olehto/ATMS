package com.atms.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.util.Set;


@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "sprintId")
public class Sprint {
    private int sprintId;
    @NotNull
    private Date dateStart;
    @NotNull
    private Date dateEnd;
    @JsonIgnore
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

    @Column(name = "date_start")
    public Date getDateStart() {
        return dateStart;
    }

    public void setDateStart(Date dateStart) {
        this.dateStart = dateStart;
    }

    @Column(name = "date_end")
    public Date getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(Date dateEnd) {
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
