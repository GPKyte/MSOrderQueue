package com.msorderqueue.server;

import com.msorderqueue.server.RequestStatus;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

/**
 * @author Gavin Kyte
 */
@Data
public class RequestItem {
    private String fileName;
    private RequestStatus status;
    private int qty;

    public RequestItem() {}

    public RequestItem(String fileName, int qty) {
        this.fileName = fileName;
        this.status = RequestStatus.ORDERED;
        this.qty = qty;
    }
}
