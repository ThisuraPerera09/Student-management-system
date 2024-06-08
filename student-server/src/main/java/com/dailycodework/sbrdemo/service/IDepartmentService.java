package com.dailycodework.sbrdemo.service;

import com.dailycodework.sbrdemo.model.Department;

import java.util.List;

public interface IDepartmentService {
    Department addDepartment(Department department);
    List<Department> getAllDepartment();
    Department updateDepartment(Department department, Long id);
    Department getDepartmentById(Long id);
    void deleteDepartment(Long id);
}
