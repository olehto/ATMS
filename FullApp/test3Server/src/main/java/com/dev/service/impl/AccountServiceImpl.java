package com.dev.service.impl;

import com.dev.model.Account;
import com.dev.repository.AccountRepository;
import com.dev.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by EvSpirit on 11.03.2017.
 */
@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Account add(Account account) {
        if(accountRepository.getByName(account.getUsername())==null) {
            Account savedAccount = accountRepository.saveAndFlush(account);

            return savedAccount;
        }
        else{
            return null;
        }
    }

    @Override
    public List<Account> delete(String name) {
        ///write method
        return accountRepository.deleteByUsername(name);
    }

    @Override
    public Account getAuth(String name,String pass) {
        return accountRepository.findAuth(name,pass);
    }

    @Override
    public Account edit(Account account) {
        return accountRepository.saveAndFlush(account);
    }

    @Override
    public List<Account> getAll() {
        return accountRepository.findAll();
    }
}