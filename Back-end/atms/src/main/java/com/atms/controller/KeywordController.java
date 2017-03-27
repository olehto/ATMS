package com.atms.controller;

import com.atms.model.Keyword;
import com.atms.service.KeywordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * Created by alex on 3/17/2017.
 */
@RestController
@CrossOrigin
public class KeywordController {

    private final KeywordService keywordService;

    @Autowired
    public KeywordController(KeywordService keywordService) {
        this.keywordService = keywordService;
    }

    @RequestMapping(value = "/api/keyword", method = RequestMethod.GET)
    public ResponseEntity<List<Keyword>> getAll() {
        List<Keyword> keywords = keywordService.findAll();
        if (keywords == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(keywords, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/keyword/{keywordId}", method = RequestMethod.GET)
    public ResponseEntity<Keyword> get(@PathVariable("keywordId") String keywordId) {
        Keyword keyword = keywordService.findOne(Integer.parseInt(keywordId));
        if (keyword == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(keyword, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/keyword}", method = RequestMethod.POST)
    public ResponseEntity<Keyword> add(@Valid Keyword keyword) {
        if (keywordService.findOne(keyword.getKeywordId()) != null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(keywordService.save(keyword), HttpStatus.OK);
    }

    @RequestMapping(value = "/api/keyword/{keywordId}", method = RequestMethod.PUT)
    public ResponseEntity<Keyword> update(@Valid Keyword keyword, @PathVariable("keywordId") String keywordId) {
        Keyword oldKeyword = keywordService.findOne(Integer.parseInt(keywordId));
        if (oldKeyword == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        oldKeyword.setValue(keyword.getValue());
        // oldKeyword.setTasks(keyword.getTasks());
        return new ResponseEntity<>(keywordService.update(oldKeyword), HttpStatus.OK);
    }

    @RequestMapping(value = "/api/keyword/{keywordId}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable("keywordId") String keywordId) {
        if (keywordService.delete(Integer.parseInt(keywordId))) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
