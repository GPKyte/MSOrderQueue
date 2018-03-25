package com.msorderqueue.server;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

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

    @PostMapping(value="/users")
    public User createUser(@Valid @RequestBody User user) {
        if (user.getRole() == null) {user.setRole(User.Role.REQUESTER);}
        return userRepository.save(user);
    }

    @DeleteMapping(value="/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") String id) {
        return userRepository.findById(id)
                .map(user -> {
                    userRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
