package com.msorderqueue.server;

import org.springframework.data.repository.CrudRepository;
/**
 * @author Gavin Kyte
 */
// tag::code[]
public interface PrinterRepository extends CrudRepository<Printer, Long> {

}
// end::code[]
