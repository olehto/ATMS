package com.atms.service;

import com.atms.model.Keyword;

import java.util.List;

/**
 * Created by alex on 3/15/2017.
 */
public interface KeywordService {
    Keyword save(Keyword keyword);

    Keyword update(Keyword keyword);

    Keyword findOne(Integer id);

    List<Keyword> findAll();

    boolean delete(Integer id);
}
