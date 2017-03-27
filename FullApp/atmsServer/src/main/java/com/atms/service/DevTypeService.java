package com.atms.service;

import com.atms.model.DevType;

import java.util.List;

public interface DevTypeService {

    DevType save(DevType devType);

    DevType update(DevType devType);

    DevType findOne(Integer id);

    List<DevType> findAll();

    boolean delete(Integer id);
}
