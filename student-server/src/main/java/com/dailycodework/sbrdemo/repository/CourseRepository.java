package com.dailycodework.sbrdemo.repository;

import com.dailycodework.sbrdemo.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    // Additional query methods (if needed) can be defined here
    List<Course> findByDepartmentId(Long departmentId);
    Set<Course> findAllById(Set<Long> ids);
}
