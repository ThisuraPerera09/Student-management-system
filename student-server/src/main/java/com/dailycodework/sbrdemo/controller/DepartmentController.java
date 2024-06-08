package com.dailycodework.sbrdemo.controller;


import com.dailycodework.sbrdemo.model.Department;

import com.dailycodework.sbrdemo.service.IDepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000") // Allowing client application to consume the backend
@RestController
@RequestMapping("/departments")
@RequiredArgsConstructor
public class DepartmentController {
    private final IDepartmentService departmentService;

    @GetMapping
    public ResponseEntity<List<Department>> getAllDepartment() {
        List<Department> departments = departmentService.getAllDepartment();
        return new ResponseEntity<>(departments, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Department> addDepartment(@RequestBody Department department) {
        Department addDepartment = departmentService.addDepartment(department);
        return new ResponseEntity<>(addDepartment, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Department> updateDepartment(@RequestBody Department department, @PathVariable Long id) {
        Department updateDepartment = departmentService.updateDepartment(department, id);
        return new ResponseEntity<>(updateDepartment, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable Long id) {
        departmentService.deleteDepartment(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/department/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable Long id) {
        Department department = departmentService.getDepartmentById(id);
        return new ResponseEntity<>(department, HttpStatus.OK);
    }
}
