package com.atms.service;

import com.atms.model.Technology;
import com.atms.model.Type;

import java.util.List;

/**
 * Created by alex on 3/15/2017.
 */
public interface TypeService {
    Type save(Type type);

    Type update(Type type);

    Type findOne(Integer id);

    List<Type> findAll();

    void delete(Type type);
}
