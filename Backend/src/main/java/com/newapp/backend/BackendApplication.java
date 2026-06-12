package com.newapp.backend;

import java.io.File;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.newapp.backend.kanban.KanbanSettingService;
import com.newapp.backend.langue.LangueService;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        // sqlite-jdbc cree le fichier .db mais pas le dossier parent
        new File("data").mkdirs();
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner seedKanbanSettings(KanbanSettingService service) {
        return args -> service.seedIfEmpty();
    }

    @Bean
    CommandLineRunner seedLangues(LangueService service) {
        return args -> service.seedIfEmpty();
    }
}
