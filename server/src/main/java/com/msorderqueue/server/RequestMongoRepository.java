package com.msorderqueue.server;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Gavin Kyte
 */
public interface RequestMongoRepository extends MongoRepository<Request, String> {
    Optional<Request> findById(String id);

    @Query(value="{'user': ?0}")
    List<Request> findByUser(String username);
    List<Request> findByStatus(RequestStatus status);
}
