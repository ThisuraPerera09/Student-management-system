package com.thisura.sbrdemo.service;

import com.thisura.sbrdemo.model.Department;

import java.util.List;

public interface IDepartmentService {
    Department addDepartment(Department department);
    List<Department> getAllDepartment();
    Department updateDepartment(Department department, Long id);
    Department getDepartmentById(Long id);
    void deleteDepartment(Long id);
}
