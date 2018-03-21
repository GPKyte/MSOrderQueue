package com.msorderqueue.server;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

/**
 * @author Gavin Kyte
 */
@Data
@Document(collection = "printers")
public class Printer {
    @Id
    private String id;
    private String brand;
    private String model;
    private String name;
    private String status;

    private Printer() {}

    public Printer(String brand, String model, String name, String status) {
        this.brand = brand;
        this.model = model;
        this.name = name;
        this.status = status;
    }
}
