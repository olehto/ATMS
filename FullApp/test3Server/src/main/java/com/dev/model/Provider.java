package com.dev.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by EvSpirit on 10.03.2017.
 */
@Entity
public class Provider {
    private int providerId;
    private String mail;
    private String phone;

    @Id
    @Column(name = "Provider_id", nullable = false)
    public int getProviderId() {
        return providerId;
    }

    public void setProviderId(int providerId) {
        this.providerId = providerId;
    }

    @Basic
    @Column(name = "Mail", nullable = false, length = 129)
    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    @Basic
    @Column(name = "Phone", nullable = false, length = 13)
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Provider provider = (Provider) o;

        if (providerId != provider.providerId) return false;
        if (mail != null ? !mail.equals(provider.mail) : provider.mail != null) return false;
        if (phone != null ? !phone.equals(provider.phone) : provider.phone != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = providerId;
        result = 31 * result + (mail != null ? mail.hashCode() : 0);
        result = 31 * result + (phone != null ? phone.hashCode() : 0);
        return result;
    }
}
