package com.msorderqueue.server;

import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.annotation.JsonCreator;


/**
 * @author Gavin Kyte
 */
public enum PrinterStatus {
    OPEN("READY"), BUSY("BUSY"), DONE("FINISHED");

    private final String altText;
    private PrinterStatus(String altText) { this.altText = altText; }

    public String getAltText() { return this.altText; }

    @JsonCreator
    public static PrinterStatus fromText(String text){
        text = text.trim().toUpperCase();
        for(PrinterStatus ps : PrinterStatus.values()){
           if(ps.toString().equals(text)){
               return ps;
           } else if(ps.getAltText().equals(text)){
               return ps;
           }
        }
        throw new IllegalArgumentException();
   }
}
