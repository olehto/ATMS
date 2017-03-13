package com.dev.model;

import javax.persistence.*;

/**
 * Created by EvSpirit on 10.03.2017.
 */
@Entity
public class Property {
    private int propertyId;
    private String value;
    private Product productByProductId;

    @Id
    @Column(name = "Property_id", nullable = false)
    public int getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(int propertyId) {
        this.propertyId = propertyId;
    }

    @Basic
    @Column(name = "Value", nullable = false, length = 64)
    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Property property = (Property) o;

        if (propertyId != property.propertyId) return false;
        if (value != null ? !value.equals(property.value) : property.value != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = propertyId;
        result = 31 * result + (value != null ? value.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "Product_id", referencedColumnName = "Product_id", nullable = false)
    public Product getProductByProductId() {
        return productByProductId;
    }

    public void setProductByProductId(Product productByProductId) {
        this.productByProductId = productByProductId;
    }
}
