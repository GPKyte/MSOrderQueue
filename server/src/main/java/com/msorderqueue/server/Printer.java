package com.msorderqueue.server;

import com.msorderqueue.server.PrinterStatus;
import javax.validation.constraints.NotBlank;
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
    @Id
    private String id;
    private String brand;
    private String model;
    private String name;
    private PrinterStatus status;
    private String requestID;
    private ArrayList<HashMap<String, Integer>> filesPrinting;

    private Printer() {}

    public Printer(String brand, String model, String name, PrinterStatus status) {
        this.brand = brand;
        this.model = model;
        this.name = name;
        setStatus(status);
        this.requestID = null;
        this.filesPrinting = new ArrayList<HashMap<String, Integer>>();
    }

    public void setStatus(PrinterStatus status) {
        this.status = status;
    }
    
    public ArrayList<HashMap<String, Integer>> getFilesPrinting() {
        return (this.filesPrinting == null)?
            new ArrayList<HashMap<String, Integer>>() :
            this.filesPrinting;
    }
}
