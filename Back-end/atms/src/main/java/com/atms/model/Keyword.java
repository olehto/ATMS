package com.atms.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.Set;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "keywordId")
public class Keyword {
    private int keywordId;
    private String value;
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "requirementId")
    @JsonIdentityReference(alwaysAsId = true)
    private Set<Requirement> requirements;

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

    @ManyToMany
    @JoinTable(joinColumns = @JoinColumn(name = "keyword_id"), inverseJoinColumns = @JoinColumn(name = "requirement_id"))
    public Set<Requirement> getRequirements() {
        return requirements;
    }

    public void setRequirements(Set<Requirement> requirements) {
        this.requirements = requirements;
    }
}
