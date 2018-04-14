package com.msorderqueue.server;


import com.msorderqueue.server.RequestStatus;
import com.msorderqueue.server.RequestItem;

import java.util.Date;
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
    private String user; // References requester username
    private String comments;
    private Date timestamp;
    private RequestStatus status;
    private boolean forClass;
    private ArrayList<RequestItem> requestItems;

    public Request() {}

    public Request(String user, String comments, boolean forClass, ArrayList<RequestItem> requestItems) {
        this.user = user;
        this.comments = comments;
        this.forClass = forClass;
        this.status = RequestStatus.ORDERED;
        this.requestItems = new ArrayList<>(requestItems);
        this.timestamp = new Date();
    }

    public void setStatus() {
        RequestStatus status;
        int ordered = 0;
        int inProcess = 0;
        int complete = 0;
        for (RequestItem i : requestItems) {
            switch (i.getStatus()) {
                case ORDERED: ordered++; break;
                case IN_PROCESS: inProcess++; break;
                case COMPLETE: complete++; break;
                default: break;
            }
        }
        if (inProcess > 0 || (complete > 0 && ordered > 0)) { status = RequestStatus.IN_PROCESS; }
        else if (complete == requestItems.size()) { status = RequestStatus.COMPLETE; }
        else { status = RequestStatus.ORDERED; }
        this.status = status;
    }
}
