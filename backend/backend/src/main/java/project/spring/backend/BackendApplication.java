package project.spring.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import project.spring.backend.model.Employee;
import project.spring.backend.respository.EmployeeRespository;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

	public static void main(String[] args) {

		SpringApplication.run(BackendApplication.class,args);
	}
@Autowired
	private EmployeeRespository employeeRespository;

	@Override
	public void run(String... args) throws Exception {
//		Employee employee = new Employee();
//		Employee employee = new Employee();
//		employee.setFirstName(("Dung"));
//		employee.setLastName("Na");
//		employee.setEmailId("dungnv@gmail.com");
//		employeeRespository.save(employee);
//
//		Employee employee1 = new Employee();
//		employee1.setFirstName(("Duc "));
//		employee1.setLastName("Anh");
//		employee1.setEmailId("anhnv@gmail.com");
//		employeeRespository.save(employee1);
	}
}
