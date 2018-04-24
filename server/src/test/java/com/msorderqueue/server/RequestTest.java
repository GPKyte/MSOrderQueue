package com.msorderqueue.server;

// import org.junit.Before;
import org.junit.Test;
// import org.junit.After;
import static org.junit.Assert.*;
import java.util.ArrayList;

public class RequestTest {
    @Test
    public void testCreateRequest() {
        ArrayList<RequestItem> items1 = new ArrayList<>();
        RequestItem r1 = new RequestItem("testFile1.stl", 83, "blue");
        RequestItem r2 = new RequestItem("secondFile.stl", 5, "purple");
        RequestItem r3 = new RequestItem("thirdFile.stl", 7);
        // RequestItem r4 = new RequestItem("testFile2.stl", 3, "glow-in-the-dark");
        // RequestItem r5 = new RequestItem("fourthFile.stl", 14, "baby puke green");
        // RequestItem r6 = new RequestItem();

        items1.add(r1); items1.add(r2); items1.add(r3);
        Request goodRequest = new Request("user", "comments", true, items1);
        Request nullRequest = new Request();

        assertEquals(goodRequest.getStatus(), RequestStatus.ORDERED);
        assertEquals(goodRequest.getComments(), "comments");
        assertEquals(goodRequest.getRequestItems().size(), 3);
        assertEquals(goodRequest.getRequestItems().get(0).getColor(), "blue");
        assertEquals(goodRequest.isForClass(), true);

        assertNull(nullRequest.getUser());
        assertNull(nullRequest.getRequestItems());
        assertNull(nullRequest.getComments());
        assertNull(nullRequest.getStatus());
        assertEquals(nullRequest.isForClass(), false);
        assertNotNull(nullRequest.getTimestamp());
    }

    @Test
    public void testSetStatus() {
        // Note can't change status between ORDERED/IN_PROCESS/COMPLETE externally
        // since it's meant to be based off of state
        // But NOTIFIED and DELIVERED are less so and will be handled externally
        // Should also be dependent on the Request being COMPLETE by the conditions
        // given in updateStatus()
        Request nullReq = new Request();
        assertNull(nullReq.getRequestItems());
        assertNull(nullReq.getStatus());
        nullReq.setStatus(RequestStatus.ORDERED);
        assertNull(nullReq.getStatus());
        nullReq.setStatus(RequestStatus.IN_PROCESS);
        assertNull(nullReq.getStatus());
        nullReq.setStatus(RequestStatus.COMPLETE);
        assertNull(nullReq.getStatus());
        nullReq.setStatus(RequestStatus.NOTIFIED);
        assertEquals(nullReq.getStatus(), RequestStatus.NOTIFIED);
        nullReq.setStatus(RequestStatus.DELIVERED);
        assertEquals(nullReq.getStatus(), RequestStatus.DELIVERED);

        ArrayList<RequestItem> items = new ArrayList<>();
        RequestItem r1 = new RequestItem("testFile1.stl", 83, "blue");
        RequestItem r2 = new RequestItem("secondFile.stl", 5, "purple");
        RequestItem r3 = new RequestItem("thirdFile.stl", 7);

        items.add(r1); items.add(r2); items.add(r3);
        Request goodRequest = new Request("user", "comments", true, items);

        // Test that we switch to in progress after item is in process
        assertEquals(goodRequest.getStatus(), RequestStatus.ORDERED);
        r1.setCompleted(83);
        r2.setCompleted(1);
        items.set(0, r1);
        items.set(1, r2);
        goodRequest.setRequestItems(items);
        assertEquals(goodRequest.getStatus(), RequestStatus.IN_PROCESS);

        // Now to complete the request
        r2.setCompleted(5);
        r3.setCompleted(7);
        items.set(1, r1);
        items.set(2, r2);
        assertEquals(items.get(0).getStatus(), RequestStatus.COMPLETE);
        assertEquals(items.get(1).getStatus(), RequestStatus.COMPLETE);
        assertEquals(items.get(2).getStatus(), RequestStatus.COMPLETE);
        goodRequest.setRequestItems(items);
        assertEquals(goodRequest.getStatus(), RequestStatus.COMPLETE);
    }

    @Test
    public void testCompareTo() {
        return;
    }
}
