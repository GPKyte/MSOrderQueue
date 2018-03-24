package com.msorderqueue.server;


import com.msorderqueue.server.RequestStatus;
import com.msorderqueue.server.RequestItem;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;

import lombok.Data;

/**
 * @author Gavin Kyte
 */
@Data
public class Request {
    @Id
    private String id; // Make this a timestamp
    private String comments;
    private RequestStatus status;
    private boolean forClass;
    private ArrayList<RequestItem> requestItems;

    public Request() {}

    public Request(String comments, boolean forClass, ArrayList<RequestItem> requestItems) {
        this.comments = comments;
        this.forClass = forClass;
        this.status = RequestStatus.ORDERED;
        this.requestItems = new ArrayList(requestItems);
    }
}
