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
    private int qty;
    private int completed;
    private boolean started;
    private RequestStatus status;
    private String color;

    public RequestItem() {}

    public RequestItem(String fileName, int qty, String color) {
        this.fileName = fileName;
        this.qty = qty;
        this.completed = 0;
        this.started = false;
        this.status = RequestStatus.ORDERED;
        this.color = color;
    }

    public RequestItem(String fileName, int qty) {
        this.fileName = fileName;
        this.qty = qty;
        this.completed = 0;
        this.started = false;
        this.status = RequestStatus.ORDERED;
        this.color = "Any";
    }

    public RequestStatus getStatus() {
        return this.status;
    }

    public void setStatus() {
        if(!this.started) {
            this.status = RequestStatus.ORDERED;
        } else if(this.started || this.completed > 0) {
            this.status = RequestStatus.IN_PROCESS;
        } else if(this.completed >= qty) {
            this.status = RequestStatus.COMPLETE;
        } else {
            this.status = RequestStatus.ORDERED;
        }
    }

    public void setStatus(RequestStatus status) {
        setStatus();
    }

    public void setCompleted(int num) {
        if(num < 0) { throw new IllegalArgumentException(); }

        this.completed = num;
        if(num > 0) { this.started = true; }
        setStatus();
    }

    public void setStarted(boolean isStarted) {
        this.started = (isStarted || this.completed > 0);
    }

}
