package com.atms.model;

import javax.persistence.*;
import java.util.Collection;
import java.util.Set;


@Entity
public class DevType {
    private int devTypeId;
    private String value;
    private Set<Developer> developers;

    @Id
    @Column(name = "dev_type_id")
    public int getDevTypeId() {
        return devTypeId;
    }

    public void setDevTypeId(int devTypeId) {
        this.devTypeId = devTypeId;
    }


    @Column(name = "value")
    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }


    @OneToMany(mappedBy = "developers")
    public Set<Developer> getDevelopers() {
        return developers;
    }

    public void setDevelopers(Set<Developer> developers) {
        this.developers = developers;
    }
}
