@Data
@Entity
public class Printer {
    private @Id @GeneratedValue Long id;
    private String name;
    private String brand;
    private String model;
    private String status;

    private Printer() {}

    public Printer(String name, String brand, String model, String status) {
        this.name = name;
        this.brand = brand;
        this.model = model;
        this.status = status;
    }
}
