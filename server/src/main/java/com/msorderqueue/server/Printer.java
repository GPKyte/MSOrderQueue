package com.msorderqueue.server;

import com.msorderqueue.server.PrinterStatus;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

import lombok.Data;

/**
 * @author Gavin Kyte
 */
@Data
@Document(collection = "printers")
public class Printer {
    @Id private String id;
    @NotBlank private String brand;
    @NotBlank private String model;
    @NotBlank private String name;
    @NotNull private PrinterStatus status;
    private String requestID;
    private ArrayList<PrintItem> printItems; // [{"index": Integer, "qty": Integer}]

    private Printer() {
        this.requestID = null;
    }

    public Printer(String brand, String model, String name, PrinterStatus status) {
        this(brand, model, name);
    }

    public Printer(String brand, String model, String name) {
        this.brand = brand;
        this.model = model;
        this.name = name;
        this.printItems = new ArrayList<PrintItem>();
        this.status = PrinterStatus.OPEN; // Illusion of choice
    }

    public void conditionalSetStatus(PrinterStatus status) {
        switch(status) {
            case OPEN:  this.requestID = "";
                        this.printItems.clear();
                        this.status = status;
                        break;

            case BUSY:  if(this.requestID == null || "".equals(this.requestID) || this.printItems.isEmpty()) {
                            this.status = PrinterStatus.OPEN;
                        } else {
                            this.status = status;
                        }
                        break;

            case DONE:  this.status = status;
                        break;

            default:    this.status = PrinterStatus.OPEN;
                        break;
        }
    }

    public void setStatus(PrinterStatus status) {
        this.status = status;
    }
}
