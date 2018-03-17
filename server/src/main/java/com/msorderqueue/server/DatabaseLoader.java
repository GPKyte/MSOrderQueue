package com.msorderqueue.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * @author Gavin Kyte
 */
// tag::code[]
@Component
public class DatabaseLoader implements CommandLineRunner {

	private final PrinterRepository repository;

	@Autowired
	public DatabaseLoader(PrinterRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception {
		this.repository.save(new Printer("Sully", "MakerBot", "5th Gen Replicator", "READY"));
	}
}
// end::code[]
