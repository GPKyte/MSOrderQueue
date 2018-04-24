package com.msorderqueue.server;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Data;

/**
 * @author Gavin Kyte
 */
@Data
public class PrintItem {
    @NotBlank private int qty = 1;
    @NotBlank private int index = 0;

    public PrintItem() {}

    public PrintItem(int qty, int index) {
        this.qty = qty;
        this.index = index;
    }
}
