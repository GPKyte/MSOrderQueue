package com.msorderqueue.server;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerTest {
    @Autowired
    private UserController controller;

    @Before
    public void setUp() {
        User u1 = new User("Gavin", "K", "kyteg", "dragoesubs@gmail.com", User.Role.ADMIN);
        User u2 = new User("Jack", "M", "montyjack3", "dragoesubs@gmail.com", User.Role.ADMIN);
        User u3 = new User("Solomon", "G", "ghberemeskels", "dragoesubs@gmail.com", User.Role.STAFF);
        User u4 = new User("Haodong", "J", "haodongeric", "dragoesubs@gmail.com", User.Role.REQUESTER);
        User u5 = new User("Aaron", "C", "B0aker", "dragoesubs@gmail.com", User.Role.REQUESTER);

        for(User u : new User[]{u1, u2, u3, u4, u5}) {
            assertNotNull(u);
            controller.createUser(u);
            assertEquals(controller.getUserById(u.getUsername()).isPresent(), true);
            assertNotNull(controller.getUserById(u.getUsername()).get()); // Extra .get() is to handle Optional type
        }
    }

    @Test
    public void testGetAllUsers() {
        return;
    }

    @Test
    public void testGetUserById() {
        return;
    }

    @Test
    public void testCreateUser() {
        return;
    }

    @Test
    public void testDeleteUser() {
        return;
    }

    @After
    public void tearDown() {
        for(User u : controller.getAllUsers()) {
            controller.deleteUser(u.getUsername());
        }
    }
}
