package com.msorderqueue.server;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.annotation.JsonCreator;

import java.util.ArrayList;

import lombok.Data;

/**
 * @author Gavin Kyte
 */
@Data
@Document(collection = "users")
public class User {
    @NotBlank private String firstName;
    @NotBlank private String lastName;
    @Id @NotBlank private String username;
    @NotBlank private String email;
    @NotNull private Role role = Role.REQUESTER;

    public enum Role {
        REQUESTER, STAFF, ADMIN;

        @JsonCreator
        public static Role fromText(String text){
            text = text.trim().toUpperCase();
            for(Role r : Role.values()){
               if(r.toString().equals(text)){
                   return r;
               }
            }
            throw new IllegalArgumentException();
       }
    };

    public User() {}

    public User(String first, String last, String username, String email, Role role) {
        this.username = username;
        this.firstName = first;
        this.lastName = last;
        this.email = email;
        this.role = role;
    }
}
