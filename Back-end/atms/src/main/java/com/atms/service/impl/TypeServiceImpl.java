package com.atms.service.impl;

import com.atms.model.Type;
import com.atms.repository.TypeRepository;
import com.atms.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created by alex on 3/15/2017.
 */
public class TypeServiceImpl implements TypeService {

    @Autowired
    private TypeRepository typeRepository;

    @Override
    public Type save(Type type) {
        return typeRepository.saveAndFlush(type);
    }

    @Override
    public Type update(Type type) {
        return typeRepository.save(type);
    }

    @Override
    public Type findOne(Integer id) {
        return typeRepository.findOne(id);
    }

    @Override
    public List<Type> findAll() {
        return typeRepository.findAll();
    }

    @Override
    public void delete(Type type) {
        typeRepository.delete(type);
    }
}
