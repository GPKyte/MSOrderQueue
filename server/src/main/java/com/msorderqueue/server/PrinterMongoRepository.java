package com.msorderqueue.server;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author Gavin Kyte
 */
public interface PrinterMongoRepository extends MongoRepository<Printer, String> {
    Printer findByName(String name);
}
