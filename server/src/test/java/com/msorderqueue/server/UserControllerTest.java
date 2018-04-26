package com.msorderqueue.server;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import static org.junit.Assert.*;
import java.util.List;
import java.util.Optional;

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
        List<User> ul = controller.getAllUsers();
        assertEquals(ul.size(),5);
        User sg = new User();
        for (User u :ul) {
          if (u.getFirstName().equals("Solomon")) {
              sg = u;
          }
        }
        assertEquals(sg.getLastName(),"G");
        assertEquals(sg.getUsername(),"ghberemeskels");
        assertEquals(sg.getEmail(),"dragoesubs@gmail.com");
        assertEquals(sg.getRole(),User.Role.STAFF);
        return;
    }

    @Test
    public void testGetUserById() {
        Optional<User> uo = controller.getUserById("haodongeric");
        User ej = uo.get();
        assertEquals(ej.getUsername(), "haodongeric");
        assertEquals(ej.getFirstName(), "Haodong");
        assertEquals(ej.getLastName(), "J");
        assertEquals(ej.getEmail(), "dragoesubs@gmail.com");
        assertEquals(ej.getRole(),User.Role.REQUESTER);
        return;
    }


    @Test
    public void testDeleteUser() {
        controller.deleteUser("B0aker");
        Optional<User> ac = controller.getUserById("B0aker");
        assertEquals(ac.isPresent(), false);
        return;
    }

    @After
    public void tearDown() {
        for(User u : controller.getAllUsers()) {
            controller.deleteUser(u.getUsername());
        }
    }
}
