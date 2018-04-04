package com.msorderqueue.server;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import static org.junit.Assert.*;
import java.util.ArrayList;
import java.util.Optional;

@RunWith(SpringRunner.class)
@SpringBootTest
public class RequestMongoRepositoryTest {
    @Autowired
    private RequestMongoRepository requestMongoRepository;
    private String id1;
    private String id2;

	@Before
    public void setUp() throws Exception {
        ArrayList<RequestItem> items1 = new ArrayList<>();
        items1.add(new RequestItem("testFile1.stl", 83));
        items1.add(new RequestItem("secondFile.stl", 5));
        Request req1 = new Request("kyteg", "Comments are for nerds", false,  items1);

        ArrayList<RequestItem> items2 = new ArrayList<>();
        items2.add(new RequestItem("testFile2.stl", 3));
        items2.add(new RequestItem("fourthFile.stl", 14));
        Request req2 = new Request("jiangh", "Comments are fun", true, items2);

        this.requestMongoRepository.save(req1);
        this.requestMongoRepository.save(req2);

        id1 = req1.getId();
        id2 = req2.getId();
        assertNotNull(id1);
        assertNotNull(id2);
    }

    @Test
    public void testFetchData() {
        Optional<Request> optionalRequest = requestMongoRepository.findById(id1);
        Request requestA = (optionalRequest.isPresent()) ? optionalRequest.get() : null;
        assertNotNull(requestA);
        assertEquals("Comments are for nerds", requestA.getComments());
        assertEquals("kyteg", requestA.getUser());
        assertEquals(false, requestA.isForClass());
        Iterable<Request> requests = requestMongoRepository.findAll();
        int count = 0;
        for(Request r : requests) {
            count++;
        }
        assertEquals(count, 2);
    }

    @Test
    public void testDataUpdate() {
        Optional<Request> optionalRequest = requestMongoRepository.findById(id2);
        Request requestA = (optionalRequest.isPresent()) ? optionalRequest.get() : null;
        assertNotNull(requestA);
        requestA.setComments("Scale to 5 inches"); // Change value of comments
        requestMongoRepository.save(requestA); // Update

        optionalRequest = requestMongoRepository.findById(id2); // Should be the same entity
        Request requestB = (optionalRequest.isPresent()) ? optionalRequest.get() : null;
        assertNotNull(requestB);
        assertEquals("Scale to 5 inches", requestB.getComments());
    }

    @After
    public void tearDown() throws Exception {
        this.requestMongoRepository.deleteAll();
    }
}
