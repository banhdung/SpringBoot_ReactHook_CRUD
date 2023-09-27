package project.spring.backend.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.spring.backend.model.Employee;


public interface EmployeeRespository  extends JpaRepository<Employee , Long> {
    //all crud database methods

}
