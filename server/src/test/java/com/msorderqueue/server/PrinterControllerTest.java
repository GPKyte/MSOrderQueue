package com.msorderqueue.server;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import static org.junit.Assert.*;
import java.util.List;
import java.util.Optional;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PrinterControllerTest {
    @Autowired
    private PrinterController controller;

    @Before
    public void setUp() throws Exception {
        Printer p1 = new Printer("MakerBot", "Replicator 5th Gen", "Bruce", PrinterStatus.BUSY);
        Printer p2 = new Printer("MakerBot", "Z-18", "Tiny", PrinterStatus.BUSY);
        Printer p3 = new Printer("MakerBot", "Replicator 5th Gen", "Lilo", PrinterStatus.DONE);
        Printer p4 = new Printer("MakerBot", "Replicator 2x", "Jen", PrinterStatus.OPEN);
        for(Printer p : new Printer[]{p1, p2, p3, p4}) {
            assertNull(p.getId());
            assertNotNull(controller.createPrinter(p).getId());
        }
    }

    @Test
    public void testGetAllPrinters() {
       List<Printer> p1 = controller.getAllPrinters();
       assertEquals(p1.size(),4);
       Printer p;
       for (Printer x:p1){
         if (p.getName().equals("Jen")){
           px = p;
         }
       }
       //getting all the printers. check if there are printers name: Bruce, Tiny, Lilo. Jen
       assertEquals(px.getBrand(),"MakerBot");
       assertEquals(px.getModel(),"Replicator 2x");
       assertEquals(px.getStatus(),PrinterStatus.OPEN);
       return;

    @Test
    public void testCreatePrinter() {
        Printer p = new Printer("MakerBot", "Replicator 5th Gen", "Bruce", PrinterStatus.BUSY);
        // Some tests on p, maybe check the id or other fields
        assertEquals("MakerBot", p.getBrand());
        assertEquals("Replicator 5th Gen", p.getModel());
        assertEquals("Bruce", p.getName());
        assertEquals(PrinterStatus.BUSY, p.getStatus());
        assertEquals(p.getPrintItems().isEmpty(), true);
        assertNull(p.getRequestID());
    }

    @Test
    public void testUpdatePrinter() {
        return;
    }

    @Test
    public void testDeletePrinter() {
      List<Printer> printers = controller.getAllPrinters();
      String id = printers.get(0).getId();
      controller.deletePrinter(id);

      List<Printer> newPrinters = controller.getAllPrinters();
      for (Printer p : newPrinters) {
        assertEquals(false, p.getId().equals(id));
      }
    }

    @After
    public void tearDown() throws Exception {
        for(Printer p : controller.getAllPrinters()) {
            controller.deletePrinter(p.getId());
        }
    }
}
