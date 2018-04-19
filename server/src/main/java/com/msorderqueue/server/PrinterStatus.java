package com.msorderqueue.server;

import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.annotation.JsonCreator;


/**
 * @author Gavin Kyte
 */
public enum PrinterStatus {
    OPEN, BUSY, DONE;

    @JsonCreator
    public static PrinterStatus fromText(String text){
       for(PrinterStatus ps : PrinterStatus.values()){
           if(ps.toString().equals(text.trim().toUpperCase())){
               return ps;
           }
       }
       throw new IllegalArgumentException();
   }
}
