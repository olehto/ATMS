package com.dev.service;

import com.dev.model.Account;

import java.util.List;

/**
 * Created by EvSpirit on 11.03.2017.
 */
public interface AccountService {
    Account add(Account obj);
    List<Account> delete(String name);
    Account getAuth(String name,String pass);
    Account edit(Account obj);
    List<Account> getAll();
}
