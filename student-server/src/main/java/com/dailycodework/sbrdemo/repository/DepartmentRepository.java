package com.dailycodework.sbrdemo.repository;

import com.dailycodework.sbrdemo.model.Course;
import com.dailycodework.sbrdemo.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

}
