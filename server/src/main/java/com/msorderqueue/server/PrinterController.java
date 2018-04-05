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
public class PrinterController {
    @Autowired
    PrinterMongoRepository printerRepository;

    @GetMapping("/printers")
    public List<Printer> getAllPrinters() {
        Sort sortByName = new Sort(Sort.Direction.DESC, "name");
        return printerRepository.findAll(sortByName);
    }

    @PostMapping(value="/printers")
    public Printer createPrinter(@Valid @RequestBody Printer printer) {
        return printerRepository.save(printer);
    }

    @PutMapping(value="/printers/{id}")
    public ResponseEntity<Printer> updatePrinter(@PathVariable("id") String id,
                                                @Valid @RequestBody Printer printer) {
        return printerRepository.findById(id)
                .map(printerData -> {
                    printerData.setModel(printer.getModel());
                    printerData.setName(printer.getName());
                    printerData.setBrand(printer.getBrand());
                    printerData.setStatus(printer.getStatus());
                    Printer updatedPrinter = printerRepository.save(printerData);
                    return ResponseEntity.ok().body(updatedPrinter);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping(value="/printers/{id}")
    public ResponseEntity<?> deletePrinter(@PathVariable("id") String id) {
        return printerRepository.findById(id)
                .map(printer -> {
                    printerRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
