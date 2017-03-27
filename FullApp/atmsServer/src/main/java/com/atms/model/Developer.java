package com.atms.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.sql.Date;
import java.util.Set;


@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "developerId")
public class Developer {
    private Integer developerId;
    private String name;
    private String lastName;
    private Date dateOfBirth;
    private String email;
    private String telephone;
    private String nickname;
    @JsonIgnore
    private String password;
    private DevType devType;
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "taskId")
    @JsonIdentityReference(alwaysAsId = true)
    private Set<Task> tasks;
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "technologyId")
    @JsonIdentityReference(alwaysAsId = true)
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

    @Column(name = "name", nullable = false)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "last_name", nullable = false)
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Column(name = "date_of_birth", nullable = false)
    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    @Column(name = "email", unique = true, nullable = false)
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


    @Column(name = "nickname", unique = true, nullable = false)
    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }


    @Column(name = "password", nullable = false)
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

    @OneToMany(mappedBy = "developer")
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
