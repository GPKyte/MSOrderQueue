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
        printer.setStatus("READY");
        return printerRepository.save(printer);
    }

    @DeleteMapping(value="/printers")
    public void deletePrinterById(@Valid @RequestBody String id) {
        printerRepository.deleteById(id);
    }
}
