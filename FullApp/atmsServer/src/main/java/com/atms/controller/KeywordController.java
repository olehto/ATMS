package com.atms.controller;

import com.atms.model.Keyword;
import com.atms.model.Type;
import com.atms.service.KeywordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by alex on 3/17/2017.
 */
@RestController
public class KeywordController {

    private final KeywordService keywordService;

    @Autowired
    public KeywordController(KeywordService keywordService) {
        this.keywordService = keywordService;
    }

    @RequestMapping(value = "/keyword", method = RequestMethod.GET)
    public List<Keyword> getAll() {
        return keywordService.findAll();
    }

    @RequestMapping(value = "/keyword/{keywordId}", method = RequestMethod.GET)
    public Keyword getKeyword(@PathVariable("keywordId") String keywordId) {
        return keywordService.findOne(Integer.parseInt(keywordId));
    }
}
