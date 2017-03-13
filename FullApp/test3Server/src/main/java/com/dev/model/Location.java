package com.dev.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by EvSpirit on 10.03.2017.
 */
@Entity
public class Location {
    private int locationId;
    private String country;
    private String city;
    private String street;
    private String house;
    private int postCode;

    @Id
    @Column(name = "Location_id", nullable = false)
    public int getLocationId() {
        return locationId;
    }

    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }

    @Basic
    @Column(name = "Country", nullable = false, length = 32)
    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    @Basic
    @Column(name = "City", nullable = false, length = 32)
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Basic
    @Column(name = "Street", nullable = false, length = 32)
    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    @Basic
    @Column(name = "House", nullable = false, length = 8)
    public String getHouse() {
        return house;
    }

    public void setHouse(String house) {
        this.house = house;
    }

    @Basic
    @Column(name = "Post_code", nullable = false)
    public int getPostCode() {
        return postCode;
    }

    public void setPostCode(int postCode) {
        this.postCode = postCode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Location location = (Location) o;

        if (locationId != location.locationId) return false;
        if (postCode != location.postCode) return false;
        if (country != null ? !country.equals(location.country) : location.country != null) return false;
        if (city != null ? !city.equals(location.city) : location.city != null) return false;
        if (street != null ? !street.equals(location.street) : location.street != null) return false;
        if (house != null ? !house.equals(location.house) : location.house != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = locationId;
        result = 31 * result + (country != null ? country.hashCode() : 0);
        result = 31 * result + (city != null ? city.hashCode() : 0);
        result = 31 * result + (street != null ? street.hashCode() : 0);
        result = 31 * result + (house != null ? house.hashCode() : 0);
        result = 31 * result + postCode;
        return result;
    }
}
