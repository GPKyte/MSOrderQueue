package com.msorderqueue.server;

import com.msorderqueue.server.Request;

import java.util.ArrayList;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

/**
 * @author Gavin Kyte
 */
@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private Role role;
    private ArrayList<Request> requests;

    public enum Role {REQUESTER, STAFF, ADMIN};

    public User() {}

    public User(String first, String last, Role role) {
        this.firstName = first;
        this.lastName = last;
        this.role = role;
        this.requests = new ArrayList<>();
    }
}
