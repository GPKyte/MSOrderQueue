package com.msorderqueue.server;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.http.ResponseEntity;
import static org.junit.Assert.*;
import java.util.ArrayList;
import java.util.List;


@RunWith(SpringRunner.class)
@SpringBootTest
public class RequestControllerTest {
    @Autowired
    private RequestController requestController;
    private String id1, id2;
    private ArrayList<Request> testRequests; // Next step is to use this instead of id refs

	@Before
    public void setUp() throws Exception {
        ArrayList<RequestItem> items1 = new ArrayList<>();
        items1.add(new RequestItem("testFile1.stl", 83, "blue"));
        items1.add(new RequestItem("secondFile.stl", 5, "any"));
        items1.add(new RequestItem("thirdFile.stl", 7, "black"));
        Request req1 = new Request("kyteg", "Comments are for nerds", false,  items1);

        ArrayList<RequestItem> items2 = new ArrayList<>();
        items2.add(new RequestItem("testFile2.stl", 3, "red"));
        items2.add(new RequestItem("fourthFile.stl", 14, "orange"));
        Request req2 = new Request("jiangh", "Comments are fun", true, items2);

        id1 = this.requestController.createRequest(req1).getId();
        id2 = this.requestController.createRequest(req2).getId();
        assertNotNull(id1);
        assertNotNull(id2);
    }

    @Test
    public void testFetchData() {
        ResponseEntity<List<Request>> requestList = requestController.getRequestsByUser("kyteg");
        Request requestA = (requestList.getStatusCodeValue() == 200) ? requestList.getBody().get(0) : null;
        assertNotNull(requestA);
        assertEquals("Comments are for nerds", requestA.getComments());
        assertEquals("kyteg", requestA.getUser());
        assertEquals(false, requestA.isForClass());
        Iterable<Request> requests = requestController.getAllRequests().getBody(); // Should we test for 200 success?
        int count = 0;
        for(Request r : requests) {
            count++;
        }
        assertEquals(2, count);
        // Test that we have correct count of RequestItems in our Request
        ArrayList<RequestItem> items = requestA.getRequestItems();
        assertEquals(3, items.size());
        assertEquals("testFile1.stl", items.get(0).getFileName());
        assertEquals(5, items.get(1).getQty());
        assertEquals(RequestStatus.ORDERED, items.get(2).getStatus());
    }

    @Test
    public void testDataUpdate() {
        ResponseEntity<List<Request>> requestList = requestController.getRequestsByUser("jiangh");
        Request requestA = (requestList.getStatusCodeValue() == 200) ? requestList.getBody().get(0) : null;
        assertNotNull(requestA);
        requestA.setComments("Scale to 5 inches"); // Change value of comments
        requestController.updateRequest(id2, requestA); // Update

        requestList = requestController.getRequestsByUser("jiangh"); // Should be the same entity
        Request requestB = (requestList.getStatusCodeValue() == 200) ? requestList.getBody().get(0) : null;
        assertNotNull(requestB);
        assertEquals("Scale to 5 inches", requestB.getComments());
    }

    @Test
    public void testGetAllRequests() {
        return;
    }

    @Test
    public void testGetArchive() {
        return;
    }

    @Test
    public void testGetQueue() {
        return;
    }

    @After
    public void tearDown() throws Exception {
        requestController.deleteRequest(id1);
        requestController.deleteRequest(id2);
    }
}
