package com.atms.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;


@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "developerId")
public class Developer {
    private Integer developerId;
    @NotNull
    private String name;
    @NotNull
    private String lastName;
    private String email;
    private String telephone;
    @NotNull
    private String nickname;
    @NotNull
    private String password;
    private DevType devType;
    @JsonIgnore
    private Set<Task> tasks;
    @JsonIgnore
    private Set<Technology> technologies;

    @Id
    @GeneratedValue
    @Column(name = "developer_id")
    public Integer getDeveloperId() {
        return developerId;
    }

    public void setDeveloperId(Integer developerId) {
        this.developerId = developerId;
    }


    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    @Column(name = "last_name")
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


    @Column(name = "email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    @Column(name = "telephone")
    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }


    @Column(name = "nickname")
    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }


    @Column(name = "password")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @ManyToOne
    @JoinColumn(name = "dev_type_id", referencedColumnName = "dev_type_id", insertable = false, nullable = false, updatable = false)
    public DevType getDevType() {
        return devType;
    }

    public void setDevType(DevType devType) {
        this.devType = devType;
    }

    @OneToMany(mappedBy = "developer")//, targetEntity = Task.class)
    public Set<Task> getTasks() {
        return tasks;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }

    @ManyToMany
    @JoinTable(joinColumns = @JoinColumn(name = "developer_id"), inverseJoinColumns = @JoinColumn(name = "technology_id"))
    public Set<Technology> getTechnologies() {
        return technologies;
    }

    public void setTechnologies(Set<Technology> technologies) {
        this.technologies = technologies;
    }


}
