package com.msorderqueue.server;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Gavin Kyte
 */
public interface RequestMongoRepository extends MongoRepository<Request, String> {
    Optional<Request> findById(String id);
    List<Request> findByUser(String username);
}
