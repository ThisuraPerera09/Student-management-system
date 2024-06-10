package com.thisura.sbrdemo.repository;

import com.thisura.sbrdemo.model.Course;
import com.thisura.sbrdemo.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

}
