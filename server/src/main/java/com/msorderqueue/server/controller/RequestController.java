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

    @GetMapping("/requests")
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

    // @PutMapping(value="/requests/{id}")
    // public ResponseEntity<Request> updateRequest(@PathVariable("id") String id,
    //                                             @Valid @RequestBody Request request) {
    //     return requestRepository.findById(id)
    //             .map(requestData -> {
    //                 requestData.setStatus(request.getStatus());
    //                 requestData.setComments(request.getComments());
    //                 Request updatedRequest = requestRepository.save(requestData);
    //                 return ResponseEntity.ok().body(updatedRequest);
    //             }).orElse(ResponseEntity.notFound().build());
    // }

    @DeleteMapping(value="/requests/{id}")
    public ResponseEntity<?> deleteRequest(@PathVariable("id") String id) {
        return requestRepository.findById(id)
                .map(request -> {
                    requestRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
