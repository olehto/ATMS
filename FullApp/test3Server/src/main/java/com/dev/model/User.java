package com.dev.model;

/**
 * Created by EvSpirit on 12.03.2017.
 */
public class User {
    public String username;
    public String password;
    public User(Account account){
        username=account.getUsername();
        password=account.getPassword();
    }
    public User(){}
}
