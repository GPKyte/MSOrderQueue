package com.msorderqueue.server;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class PrinterController {
    @Autowired
    PrinterMongoRepository printerRepository;
    @Autowired
    RequestController requestController;

    @GetMapping("/printers")
    public List<Printer> getAllPrinters() {
        Sort sortByName = new Sort(Sort.Direction.DESC, "name");
        return printerRepository.findAll(sortByName);
    }

    @GetMapping(value="/printers/{id}")
    @ResponseBody public Optional<Printer> getPrinterById(@PathVariable("id") String id) {
        return printerRepository.findById(id);
    }

    @PostMapping(value="/printers")
    public Printer createPrinter(@Valid @RequestBody Printer printer) {
        return printerRepository.save(printer);
    }

    @PutMapping(value="/printers/{id}")
    public ResponseEntity<Printer> replacePrinter(@PathVariable("id") String id,
                                                @Valid @RequestBody Printer printer) {
        return printerRepository.findById(id)
                .map(printerData -> {
                    printerData.setModel(printer.getModel());
                    printerData.setName(printer.getName());
                    printerData.setBrand(printer.getBrand());
                    printerData.setStatus(printer.getStatus());
                    printerData.setRequestID(printer.getRequestID());
                    printerData.setPrintItems(printer.getPrintItems());
                    Printer updatedPrinter = printerRepository.save(printerData);
                    return ResponseEntity.ok().body(updatedPrinter);
                }).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping(value="/printers/{id}")
    public ResponseEntity<Printer> updatePrinter(@PathVariable("id") String id,
                                                @RequestBody Printer printer) {
        return printerRepository.findById(id)
                .map(printerData -> {
                    // Affect request if print completed
                    if(PrinterStatus.DONE.equals(printer.getStatus()) &&
                        PrinterStatus.BUSY.equals(printerData.getStatus())) {
                        completePrint(printerData);
                    }

                    // Update Printer if updates present in request
                    if(printer.getRequestID() != null && printer.getPrintItems() != null) {
                        printerData.setRequestID(printer.getRequestID());
                        printerData.setPrintItems(printer.getPrintItems());
                        // Assume BUSY now, even if not because conditionalSetStatus will confirm state
                        printerData.conditionalSetStatus(PrinterStatus.BUSY);
                    }

                    if(printer.getStatus() != null) { printerData.conditionalSetStatus(printer.getStatus()); }
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

    private void completePrint(Printer printer) {
        Optional<Request> response = requestController.getRequestById(printer.getRequestID());
        try {
            Request request = response.get();
            ArrayList<RequestItem> requestItems = request.getRequestItems();

            for(PrintItem pi : printer.getPrintItems()) {
                RequestItem ri = requestItems.get(pi.getIndex());
                ri.setCompleted(ri.getCompleted() + pi.getQty());
                requestItems.set(pi.getIndex(), ri);
            }
            request.setRequestItems(requestItems);
            System.out.println(requestController.updateRequest(request.getId(), request));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
