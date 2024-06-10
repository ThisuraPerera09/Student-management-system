package com.thisura.sbrdemo.service;

import com.thisura.sbrdemo.exception.DepartmentNotFoundException;
import com.thisura.sbrdemo.model.Department;
import com.thisura.sbrdemo.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentService implements IDepartmentService {

    private final DepartmentRepository departmentRepository;

    @Override
    public List<Department> getAllDepartment() {
        return departmentRepository.findAll();
    }

    @Override
    public Department addDepartment(Department department) {
        return departmentRepository.save(department);
    }

    @Override
    public Department updateDepartment(Department department, Long id) {
        return departmentRepository.findById(id)
                .map(d -> {
                    d.setDepartmentName(department.getDepartmentName());
                    d.setLocation(department.getLocation());
                    // You may need to handle students registration here
                    return departmentRepository.save(d);
                })
                .orElseThrow(() -> new DepartmentNotFoundException("Department not found with id " + id));
    }

    @Override
    public Department getDepartmentById(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new DepartmentNotFoundException("Department not found with id " + id));
    }

    @Override
    public void deleteDepartment(Long id) {
        if (!departmentRepository.existsById(id)){
            throw new DepartmentNotFoundException("Department not found with id " + id);
        }
        departmentRepository.deleteById(id);
    }
}
