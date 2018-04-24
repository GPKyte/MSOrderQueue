package com.msorderqueue.server;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Collections;
import java.util.ArrayList;
import java.util.stream.*;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class RequestController {
    @Autowired
    RequestMongoRepository requestRepository;

    @GetMapping(value="/requests")
    public ResponseEntity<List<Request>> getAllRequests() {
        Sort sortByTimestamp = new Sort(Sort.Direction.DESC, "timestamp");
        return ResponseEntity.ok().body(requestRepository.findAll(sortByTimestamp));
    }

    @GetMapping(value="/archive")
    public ResponseEntity<List<Request>> getArchive() {
        return ResponseEntity.ok().body(requestRepository.findByStatus(RequestStatus.COMPLETE));
    }

    @GetMapping(value="/queue")
    public @ResponseBody List<Request> getQueue() {
        List<Request> requests = requestRepository.findAll().stream()
            .filter(request -> request.getStatus() != RequestStatus.COMPLETE)
            .collect(Collectors.toList());
        Collections.sort(requests);
        return requests;
    }

    @GetMapping(value="/requests", params={"username"})
    public ResponseEntity<List<Request>> getRequestsByUser(@RequestParam String username) {
        return ResponseEntity.ok().body(requestRepository.findByUser(username));
    }

    @GetMapping(value="/requests/{id}")
    public @ResponseBody Optional<Request> getRequestById(@PathVariable("id") String id) {
        return requestRepository.findById(id);
    }

    @PostMapping(value="/requests")
    public @ResponseBody Request createRequest(@Valid @RequestBody Request request) {
        ArrayList<RequestItem> items = new ArrayList<>();
        for (RequestItem i : request.getRequestItems()) {
            items.add(new RequestItem(i.getFileName(), i.getQty()));
        }
        return requestRepository.save(new Request(request.getUser(), request.getComments(), request.isForClass(), items));
    }

    @PatchMapping(value="/requests/{id}")
    public ResponseEntity<Request> updateRequest(@PathVariable("id") String id,
                                                @RequestBody Request request) {
        return requestRepository.findById(id)
                .map(requestData -> {
                    if(request.getComments() != null) { requestData.setComments(request.getComments()); }
                    if(request.getRequestItems() != null) {
                        requestData.setRequestItems(request.getRequestItems());
                    }
                    Request updatedRequest = requestRepository.save(requestData);
                    return ResponseEntity.ok().body(updatedRequest);
                }).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping(value="/requests/{id}/{index}")
    public ResponseEntity<Request> updateRequestItem(@PathVariable("id") String id, @PathVariable("index") int index,
                                                @RequestBody RequestItem item) {
        return requestRepository.findById(id)
                .map(requestData -> {
                    ArrayList<RequestItem> items = requestData.getRequestItems();
                    RequestItem updatedItem = items.get(index);
                    if (item.getQty() > 0) { updatedItem.setQty(item.getQty()); }
                    if (item.getFileName() != null) { updatedItem.setFileName(item.getFileName()); }
                    if (item.getStatus() != null) { updatedItem.setStatus(item.getStatus()); }
                    items.set(index, updatedItem);
                    requestData.setRequestItems(items);
                    return ResponseEntity.ok().body(requestRepository.save(requestData));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping(value="/requests/{id}")
    public ResponseEntity<?> deleteRequest(@PathVariable("id") String id) {
        return requestRepository.findById(id)
                .map(request -> {
                    requestRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
