package com.dev.model;

import javax.persistence.*;

/**
 * Created by EvSpirit on 10.03.2017.
 */
@Entity
@Table(name = "booking_position", schema = "store", catalog = "")
@IdClass(BookingPositionPK.class)
public class BookingPosition {
    private int bookingId;
    private int productId;
    private String quantity;

    @Id
    @Column(name = "Booking_id", nullable = false)
    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }

    @Id
    @Column(name = "Product_id", nullable = false)
    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    @Basic
    @Column(name = "Quantity", nullable = false, length = 18)
    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BookingPosition that = (BookingPosition) o;

        if (bookingId != that.bookingId) return false;
        if (productId != that.productId) return false;
        if (quantity != null ? !quantity.equals(that.quantity) : that.quantity != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = bookingId;
        result = 31 * result + productId;
        result = 31 * result + (quantity != null ? quantity.hashCode() : 0);
        return result;
    }
}
