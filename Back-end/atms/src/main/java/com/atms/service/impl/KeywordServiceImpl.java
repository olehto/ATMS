package com.atms.service.impl;

import com.atms.model.Keyword;
import com.atms.repository.KeywordRepository;
import com.atms.service.KeywordService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * Created by alex on 3/15/2017.
 */
public class KeywordServiceImpl implements KeywordService {

    @Autowired
    private KeywordRepository keywordRepository;

    @Override
    public Keyword save(Keyword keyword) {
        return keywordRepository.saveAndFlush(keyword);
    }

    @Override
    public Keyword update(Keyword keyword) {
        return keywordRepository.saveAndFlush(keyword);
    }

    @Override
    public Keyword findOne(Integer id) {
        return keywordRepository.findOne(id);
    }

    @Override
    public List<Keyword> findAll() {
        return keywordRepository.findAll();
    }

    @Override
    public void delete(Keyword keyword) {
        keywordRepository.delete(keyword);
    }
}
