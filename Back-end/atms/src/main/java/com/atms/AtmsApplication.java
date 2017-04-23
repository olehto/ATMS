package com.atms;

import com.atms.model.Keyword;
import com.atms.model.Requirement;
import com.atms.model.Task;
import com.atms.model.Technology;
import com.atms.service.*;
import org.apache.coyote.http11.AbstractHttp11Protocol;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.embedded.tomcat.TomcatConnectorCustomizer;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class AtmsApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(AtmsApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(AtmsApplication.class);
    }

    @Bean
    public TomcatEmbeddedServletContainerFactory tomcatEmbedded() {
        TomcatEmbeddedServletContainerFactory tomcat = new TomcatEmbeddedServletContainerFactory();
        tomcat.addConnectorCustomizers((TomcatConnectorCustomizer) connector -> {
            if ((connector.getProtocolHandler() instanceof AbstractHttp11Protocol<?>)) {
                ((AbstractHttp11Protocol<?>) connector.getProtocolHandler()).setMaxSwallowSize(-1);
            }
        });
        return tomcat;
    }

    @Bean
    CommandLineRunner init(StorageService storageService) {
        return (args) -> storageService.init();
    }

    @Bean
    CommandLineRunner testSimilarity(DescriptionSimilarity descriptionSimilarity, TaskService taskService) {
        return (args) -> {
            Task task = taskService.findOne(2);
            System.out.println(descriptionSimilarity.findSimilar(task));
        };
    }

    @Bean
    CommandLineRunner testDev(IntersectionService intersectionService, DeveloperService developerService,
                              KeywordService keywordService, TechnologyService technologyService) {
        return (args) -> {
            Task task = new Task();
            task.setTitle("password");
            task.setDescription("description");
            task.setDeveloper(developerService.findOne(1));
            Requirement requirement = new Requirement();
            Set<Keyword> set = new HashSet<>();
            Set<Technology> technologySet = new HashSet<>();
            technologySet.add(technologyService.findOne(1));
            set.add(keywordService.findOne(1));
            requirement.setKeywords(set);
            requirement.setTechnologies(technologySet);
            task.setRequirement(requirement);
            Set<Task> intersectionList = intersectionService.getTop(task);
            System.out.println(intersectionList);
        };
    }

}
