package com.msorderqueue.server;

import com.msorderqueue.server.PrinterStatus;
import javax.validation.constraints.NotBlank;
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
    @NotBlank
    private PrinterStatus status;

    private Printer() {}

    public Printer(String brand, String model, String name, String status) {
        this.brand = brand;
        this.model = model;
        this.name = name;
        setStatus(status);
    }

    public void setStatus(String status) {
        PrinterStatus tmp = PrinterStatus.valueOf(status.trim().toUpperCase());
        this.status = (tmp == null)? PrinterStatus.OPEN : tmp;
    }
    public void setStatus(PrinterStatus status) {
        this.status = status;
    }
}
