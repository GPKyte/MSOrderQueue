package com.msorderqueue.server;

import com.msorderqueue.server.RequestStatus;
import com.msorderqueue.server.RequestItem;

import java.util.Date;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.NotNull.List;

import java.util.ArrayList;
import java.lang.Comparable;

import lombok.Data;

/**
 * @author Gavin Kyte
 */
@Data
@Document(collection = "requests")
public class Request implements Comparable<Request> {
    @Id private String id; // Make this a timestamp
    @NotBlank private String user; // References requester username
    private String comments;
    @NotNull private Date timestamp;
    @NotNull private RequestStatus status;
    @NotNull private boolean forClass;
    @NotNull private ArrayList<RequestItem> requestItems; // Consider using @NotNull.List

    public Request() {
        this.timestamp = new Date();
    }

    public Request(String user, String comments, boolean forClass, ArrayList<RequestItem> requestItems) {
        this();
        this.user = user;
        this.comments = comments;
        this.forClass = forClass;
        this.requestItems = new ArrayList<>(requestItems);
        this.status = RequestStatus.ORDERED;
        updateStatus();
    }

    public void updateStatus() {
        if(requestItems == null || requestItems.isEmpty()) {
            // Don't change status, likely null/NOTIFIED/DELIVERED inside a PATCH request
            return;
        }
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
        if (complete == requestItems.size() &&
            (RequestStatus.NOTIFIED.equals(this.status) || RequestStatus.DELIVERED.equals(this.status))) { return; }
        else if (complete == requestItems.size()) { status = RequestStatus.COMPLETE; }
        else if (inProcess > 0 || (complete > 0 && ordered > 0)) { status = RequestStatus.IN_PROCESS; }
        else if (inProcess == 0 && complete == 0 && ordered == 0) { status = null; }
        else { status = RequestStatus.ORDERED; }
        this.status = status;
    }

    public void setStatus(RequestStatus status) {
        if(status == null) { this.status = null; return; }
        switch(status) {
            case ORDERED:
            case IN_PROCESS:
            case COMPLETE: updateStatus(); break;
            default: this.status = status; break;
        }
    }

    public void setRequestItems(ArrayList<RequestItem> requests) {
        this.requestItems = requests;
        updateStatus();
    }

    public int compareTo(Request o) {
        int result = 0;
        if (this.forClass == o.isForClass()) {
            result = this.getTimestamp().compareTo(o.getTimestamp());
        } else if (this.forClass == true) {
            result = -1;
        } else {
            result = 1;
        }
        return result;
    }
}
