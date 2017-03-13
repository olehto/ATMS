package com.dev.model;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

/**
 * Created by EvSpirit on 10.03.2017.
 */
public class BookingPositionPK implements Serializable {
    private int bookingId;
    private int productId;

    @Column(name = "Booking_id", nullable = false)
    @Id
    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }

    @Column(name = "Product_id", nullable = false)
    @Id
    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BookingPositionPK that = (BookingPositionPK) o;

        if (bookingId != that.bookingId) return false;
        if (productId != that.productId) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = bookingId;
        result = 31 * result + productId;
        return result;
    }
}
