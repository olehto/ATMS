package com.atms.model;

import javax.persistence.*;
import java.sql.Date;
import java.util.Set;


@Entity
public class Sprint {
    private int sprintId;
    private Date dateStart;
    private Date dateEnd;
    private Integer projectId;
    private Project project;
    private Set<Task> tasks;

    @Id
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

    @Column(name = "project_id")
    public Integer getProjectId() {
        return projectId;
    }

    public void setProjectId(Integer projectId) {
        this.projectId = projectId;
    }

    @ManyToOne
    @JoinColumn(name = "project_id", referencedColumnName = "project_id")
    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    @OneToMany(mappedBy = "task")
    public Set<Task> getTasks(){return tasks;}

    public void setTasks(Set<Task> tasks){
        this.tasks = tasks;
    }

}
