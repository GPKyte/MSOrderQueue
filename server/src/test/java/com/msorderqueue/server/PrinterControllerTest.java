package com.msorderqueue.server;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import static org.junit.Assert.*;

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
        return;
    }

    @Test
    public void testCreatePrinter() {
        return;
    }

    @Test
    public void testUpdatePrinter() {
        return;
    }

    @Test
    public void deletePrinter() {
        return;
    }

    @After
    public void tearDown() throws Exception {
        for(Printer p : controller.getAllPrinters()) {
            controller.deletePrinter(p.getId());
        }
    }
}
