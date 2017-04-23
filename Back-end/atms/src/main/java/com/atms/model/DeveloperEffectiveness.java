package com.atms.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;

/**
 * @author Alex Kazanovskiy.
 */

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "developerId")
public class DeveloperEffectiveness {
    private Integer developerEffectivenessId;
    private Developer developer;
    private Keyword keyword;
    private Integer deviation;

    @Id
    @GeneratedValue
    @Column
    public Integer getDeveloperEffectivenessId() {
        return developerEffectivenessId;
    }

    public void setDeveloperEffectivenessId(Integer developerEffectivenessId) {
        this.developerEffectivenessId = developerEffectivenessId;
    }

    @ManyToOne
    @JoinColumn(name = "developer_id")
    public Developer getDeveloper() {
        return developer;
    }

    public void setDeveloper(Developer developer) {
        this.developer = developer;
    }

    @ManyToOne
    @JoinColumn(name = "keyword_id")
    public Keyword getKeyword() {
        return keyword;
    }

    public void setKeyword(Keyword keyword) {
        this.keyword = keyword;
    }

    @Column
    public Integer getDeviation() {
        return deviation;
    }

    public void setDeviation(Integer deviation) {
        this.deviation = deviation;
    }
}
