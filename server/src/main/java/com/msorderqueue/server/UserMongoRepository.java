package com.msorderqueue.server;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author Gavin Kyte
 */
public interface UserMongoRepository extends MongoRepository<User, Integer> {
    User findByName(String name);
}
