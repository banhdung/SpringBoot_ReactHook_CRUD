package project.spring.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.spring.backend.exception.ResourceNotFoundException;
import project.spring.backend.model.Employee;
import project.spring.backend.respository.EmployeeRespository;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {
    @Autowired
    private EmployeeRespository employeeRespository;
    @GetMapping
    public List<Employee> getAllEmployees(){
        return employeeRespository.findAll();
    }

    //build crate employee REST API
    @PostMapping
    public Employee createEmployee(@RequestBody  Employee employee){
        return employeeRespository.save(employee);
    }

    //build get employee by id REST API
    @GetMapping("{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable long id){
        Employee employee = employeeRespository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not exits with id : "+ id));
        return ResponseEntity.ok(employee);
    }

    //build update employee REST API
    @PutMapping("{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable long id ,@RequestBody Employee employeeDetails) {
        Employee updateEmployee = employeeRespository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not exits with id : " + id));
        updateEmployee.setFirstName(employeeDetails.getFirstName());
        updateEmployee.setLastName(employeeDetails.getLastName());
        updateEmployee.setEmailId(employeeDetails.getEmailId());
        Employee savedEmployee = employeeRespository.save(updateEmployee);
        return ResponseEntity.ok(savedEmployee);
    }

    //build delete employee by id REST API
    @DeleteMapping("{id}")
    public ResponseEntity<Employee> deleteEmployee(@PathVariable long id){
        Employee employee = employeeRespository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not exits with id : " + id));
        employeeRespository.delete(employee);
        return  new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
