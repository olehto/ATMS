package com.atms.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.sql.Date;
import java.util.Set;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "keywordId")
public class Keyword {
    private int keywordId;
    private String value;
    private Date estimation;
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "requirementId")
    @JsonIdentityReference(alwaysAsId = true)
    private Set<Requirement> requirements;
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "technologyId")
    @JsonIdentityReference(alwaysAsId = true)
    private Set<Technology> technologies;
    private Set<TaskKeyword> tasks;

    @Id
    @GeneratedValue
    @Column(name = "keyword_id")
    public int getKeywordId() {
        return keywordId;
    }

    public void setKeywordId(int keywordId) {
        this.keywordId = keywordId;
    }

    @Column(name = "value", nullable = false)
    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Column
    public Date getEstimation() {
        return estimation;
    }

    public void setEstimation(Date estimation) {
        this.estimation = estimation;
    }

    @ManyToMany
    @JoinTable(joinColumns = @JoinColumn(name = "keyword_id"), inverseJoinColumns = @JoinColumn(name = "requirement_id"))
    public Set<Requirement> getRequirements() {
        return requirements;
    }

    public void setRequirements(Set<Requirement> requirements) {
        this.requirements = requirements;
    }

    @ManyToMany
    @JoinTable(joinColumns = @JoinColumn(name = "keyword_id"), inverseJoinColumns = @JoinColumn(name = "technology_id"))
    public Set<Technology> getTechnologies() {
        return technologies;
    }

    public void setTechnologies(Set<Technology> technologies) {
        this.technologies = technologies;
    }

    @OneToMany
    public Set<TaskKeyword> getTasks() {
        return tasks;
    }

    public void setTasks(Set<TaskKeyword> tasks) {
        this.tasks = tasks;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Keyword keyword = (Keyword) o;

        return value.equals(keyword.value);
    }

    @Override
    public int hashCode() {
        return value.hashCode();
    }
}
