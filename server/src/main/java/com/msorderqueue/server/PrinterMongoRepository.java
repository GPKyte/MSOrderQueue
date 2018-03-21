package com.msorderqueue.server;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author Gavin Kyte
 */
public interface PrinterMongoRepository extends MongoRepository<Printer, Integer> {
    Printer findByName(String name);
}
