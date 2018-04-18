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
public class PrinterMongoRepositoryTest {
    @Autowired
    private PrinterMongoRepository printerMongoRepository;

	@Before
    public void setUp() throws Exception {
        Printer p1 = new Printer("MakerBot", "5th Gen Replicator", "Stitch", PrinterStatus.OPEN);
        Printer p2 = new Printer("MakerBot", "5th Gen Replicator", "Sully", PrinterStatus.BUSY);
        assertNull(p1.getId());
        assertNull(p2.getId());
        this.printerMongoRepository.save(p1);
        this.printerMongoRepository.save(p2);
        assertNotNull(p1.getId());
        assertNotNull(p2.getId());
    }

    @Test
    public void testFetchData() {
        Printer printerA = printerMongoRepository.findByName("Sully");
        assertNotNull(printerA);
        assertEquals("MakerBot", printerA.getBrand());
        Iterable<Printer> printers = printerMongoRepository.findAll();
        int count = 0;
        for(Printer p : printers) {
            count++;
        }
        assertEquals(count, 2);
    }

    @Test
    public void testDataUpdate() {
        Printer printerA = printerMongoRepository.findByName("Stitch");
        printerA.setModel("Replicator 2x");
        printerMongoRepository.save(printerA);
        Printer printerB = printerMongoRepository.findByName("Stitch");
        assertNotNull(printerB);
        assertEquals("Replicator 2x", printerB.getModel());
    }

    @After
    public void tearDown() throws Exception {
        this.printerMongoRepository.deleteAll();
    }
}
