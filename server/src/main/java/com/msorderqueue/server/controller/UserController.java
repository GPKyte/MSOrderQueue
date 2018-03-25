package com.msorderqueue.server;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.ArrayList;
import java.util.Optional;


@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class UserController {

    @Autowired
    UserMongoRepository userRepository;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        Sort sortByEmail = new Sort(Sort.Direction.DESC, "email");
        return userRepository.findAll(sortByEmail);
    }

    @GetMapping("/users/{username}")
    public Optional<User> getUserById(@PathVariable("username") String username) {
        return userRepository.findById(username);
    }

    @PostMapping(value="/users")
    public User createUser(@Valid @RequestBody User user) {
        if (user.getRole() == null) {user.setRole(User.Role.REQUESTER);}
        return userRepository.save(user);
    }

    @GetMapping(value="/users/{username}/requests")
    public ResponseEntity<ArrayList<Request>> getRequestsByUser(@PathVariable("username") String username) {
        return userRepository.findById(username)
                .map(user -> {
                    return ResponseEntity.ok().body(user.getRequests());
                }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(value="/users/{username}/requests")
    public ResponseEntity<Request> createRequest(@PathVariable("username") String username,
                                @Valid @RequestBody Request request) {
        return userRepository.findById(username)
                .map(user -> {
                    ArrayList<Request> requests = new ArrayList(user.getRequests());
                    requests.add(0, request);
                    user.setRequests(requests);
                    User updatedUser = userRepository.save(user);
                    return ResponseEntity.ok().body(updatedUser.getRequests().get(0));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping(value="/users/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable("username") String username) {
        return userRepository.findById(username)
                .map(user -> {
                    userRepository.deleteById(username);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
