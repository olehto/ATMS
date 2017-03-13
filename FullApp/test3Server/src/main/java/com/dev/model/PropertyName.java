package com.dev.model;

import javax.persistence.*;

/**
 * Created by EvSpirit on 10.03.2017.
 */
@Entity
@Table(name = "property_name", schema = "store", catalog = "")
public class PropertyName {
    private int propertyNameId;
    private String name;

    @Id
    @Column(name = "Property_name_id", nullable = false)
    public int getPropertyNameId() {
        return propertyNameId;
    }

    public void setPropertyNameId(int propertyNameId) {
        this.propertyNameId = propertyNameId;
    }

    @Basic
    @Column(name = "Name", nullable = false, length = 20)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PropertyName that = (PropertyName) o;

        if (propertyNameId != that.propertyNameId) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = propertyNameId;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        return result;
    }
}
