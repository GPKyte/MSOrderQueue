package com.msorderqueue.server;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.ArrayList;
import java.util.stream.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class RequestController {
    @Autowired
    RequestMongoRepository requestRepository;

    @GetMapping(value="/requests")
    public List<Request> getAllRequests() {
        Sort sortByTimestamp = new Sort(Sort.Direction.DESC, "timestamp");
        return requestRepository.findAll(sortByTimestamp);
    }

    @GetMapping(value="/requests?name={username}")
    public ResponseEntity<List<Request>> getRequestsByUser(@PathVariable("username") String username) {
        return ResponseEntity.ok().body(
                requestRepository.findAll()
                .stream()
                .filter(r -> username.equals(r.getUser()))
                .collect(Collectors.toList()));
    }

    @PostMapping(value="/requests")
    public Request createRequest(@Valid @RequestBody Request request) {
        ArrayList<RequestItem> items = new ArrayList<>();
        for (RequestItem i : request.getRequestItems()) {
            items.add(new RequestItem(i.getFileName(), i.getQty()));
        }
        return requestRepository.save(new Request(request.getUser(), request.getComments(), request.isForClass(), items));
    }

    // May want to remove ability to directly edit status.
    @PatchMapping(value="/requests/{id}")
    public ResponseEntity<Request> updateRequest(@PathVariable("id") String id,
                                                @Valid @RequestBody Request request) {
        return requestRepository.findById(id)
                .map(requestData -> {
                    RequestStatus status = request.getStatus();
                    String comments = request.getComments();

                    if (status != null) { requestData.setStatus(status); }
                    if (comments != null) { requestData.setComments(comments); }

                    Request updatedRequest = requestRepository.save(requestData);
                    return ResponseEntity.ok().body(updatedRequest);
                }).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping(value="/requests/{id}/{index}")
    public ResponseEntity<Request> updateRequestItem(@PathVariable("id") String id, @PathVariable("index") int index,
                                                @Valid @RequestBody RequestItem item) {
        return requestRepository.findById(id)
                .map(requestData -> {
                    ArrayList<RequestItem> items = requestData.getRequestItems();
                    RequestItem updatedItem = items.get(index);
                    if (item.getQty() > 0) { updatedItem.setQty(item.getQty()); }
                    if (item.getFileName() != null) { updatedItem.setFileName(item.getFileName()); }
                    if (item.getStatus() != null) { updatedItem.setStatus(item.getStatus()); }
                    items.set(index, updatedItem);
                    requestData.setRequestItems(items);
                    requestData.setStatus();
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
