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
    private String name;
    private String brand;
    private String model;
    private String status;

    private Printer() {}

    public Printer(String name, String brand, String model, String status) {
        this.name = name;
        this.brand = brand;
        this.model = model;
        this.status = status;
    }
}
