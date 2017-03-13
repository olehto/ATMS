package com.dev.repository;

import com.dev.model.Account;
import com.dev.model.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by EvSpirit on 11.03.2017.
 */
public interface AccountRepository extends JpaRepository<Account, Integer> {
    @Query(value = "select b from Account b where b.username = :name AND b.password=:pass")
    Account findAuth(@Param("name") String name, @Param("pass") String pass);

    @Query(value = "select b from Account b where b.username = :name")
    Account getByName(@Param("name") String name);

    @Transactional
    List<Account> deleteByUsername (String username);


}