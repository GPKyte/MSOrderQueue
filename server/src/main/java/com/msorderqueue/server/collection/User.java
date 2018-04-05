package com.msorderqueue.server;

import com.msorderqueue.server.Request;

import java.util.ArrayList;
import javax.validation.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

/**
 * @author Gavin Kyte
 */
@Data
@Document(collection = "users")
public class User {
    @Id @NotBlank
    private String username;
    private String firstName;
    private String lastName;
    @NotBlank
    private String email;
    private Role role = Role.REQUESTER;

    public enum Role {REQUESTER, STAFF, ADMIN};

    public User() {}

    public User(String first, String last, String username, String email, Role role) {
        this.username = username;
        this.firstName = first;
        this.lastName = last;
        this.email = email;
        this.role = role;
    }
}
