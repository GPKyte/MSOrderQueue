package com.msorderqueue.server;

import com.msorderqueue.server.PrinterStatus;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.HashMap;

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
    @NotNull private ArrayList<HashMap<String, Integer>> filesPrinting; // [{"index": Integer, "qty": Integer}]

    private Printer() {
        this.requestID = "";
    }

    public Printer(String brand, String model, String name, PrinterStatus status) {
        this.brand = brand;
        this.model = model;
        this.name = name;
        this.status = status;
        this.filesPrinting = new ArrayList<HashMap<String, Integer>>();
    }

    public void setStatus(PrinterStatus status) {
        switch(status) {
            case OPEN:  this.requestID = "";
                        this.filesPrinting.clear();
                        this.status = status;
                        break;

            case BUSY:  if( ! (requestID.equals("") || filesPrinting.isEmpty()) ) {
                            this.status = status;
                        } else {
                            this.status = PrinterStatus.OPEN;
                        }
                        break;

            case DONE:  this.status = status;
                        break;
            default:    break;
        }
    }
}
