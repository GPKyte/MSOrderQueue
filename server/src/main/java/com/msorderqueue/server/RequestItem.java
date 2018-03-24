package com.msorderqueue.server;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

/**
 * @author Gavin Kyte
 */
@Data
public class RequestItem {
    private String fileName;
    private Status status;
    private int qty;

    public RequestItem() {}

    public RequestItem(String fileName, Status status, int qty) {
        this.fileName = fileName;
        this.status = status;
        this.qty = qty;
    }
}
