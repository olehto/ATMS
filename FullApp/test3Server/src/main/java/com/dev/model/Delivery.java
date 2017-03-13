package com.dev.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by EvSpirit on 10.03.2017.
 */
@Entity
public class Delivery {
    private int deliveryId;
    private double deliveryPrice;
    private String title;

    @Id
    @Column(name = "Delivery_id", nullable = false)
    public int getDeliveryId() {
        return deliveryId;
    }

    public void setDeliveryId(int deliveryId) {
        this.deliveryId = deliveryId;
    }

    @Basic
    @Column(name = "Delivery_price", nullable = false, precision = 0)
    public double getDeliveryPrice() {
        return deliveryPrice;
    }

    public void setDeliveryPrice(double deliveryPrice) {
        this.deliveryPrice = deliveryPrice;
    }

    @Basic
    @Column(name = "Title", nullable = false, length = 32)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Delivery delivery = (Delivery) o;

        if (deliveryId != delivery.deliveryId) return false;
        if (Double.compare(delivery.deliveryPrice, deliveryPrice) != 0) return false;
        if (title != null ? !title.equals(delivery.title) : delivery.title != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = deliveryId;
        temp = Double.doubleToLongBits(deliveryPrice);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        result = 31 * result + (title != null ? title.hashCode() : 0);
        return result;
    }
}
