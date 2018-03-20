package com.msorderqueue.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * @author Gavin Kyte
 */
@Component
public class DatabaseLoader implements CommandLineRunner {

	private final PrinterMongoRepository repository;

	@Autowired
	public DatabaseLoader(PrinterMongoRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception {
		this.repository.save(new Printer("Sully", "MakerBot", "5th Gen Replicator", "READY"));
	}
}
