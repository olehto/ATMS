package com.atms.service.impl;

import com.atms.model.DevType;
import com.atms.repository.DevTypeRepository;
import com.atms.service.DevTypeService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class DevTypeServiceImpl implements DevTypeService {

    @Autowired
    private DevTypeRepository devTypeRepository;

    @Override
    public DevType save(DevType devType) {
        return devTypeRepository.saveAndFlush(devType);
    }

    @Override
    public DevType update(DevType devType) {
        return devTypeRepository.saveAndFlush(devType);
    }

    @Override
    public DevType findOne(Integer id) {
        return devTypeRepository.findOne(id);
    }

    @Override
    public List<DevType> findAll() {
        return devTypeRepository.findAll();
    }

    @Override
    public void delete(DevType devType) {
        devTypeRepository.delete(devType);
    }
}
