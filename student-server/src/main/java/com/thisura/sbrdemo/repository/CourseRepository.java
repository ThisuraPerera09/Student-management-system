package com.thisura.sbrdemo.repository;

import com.thisura.sbrdemo.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByDepartmentId(Long departmentId);
    Set<Course> findAllById(Set<Long> ids);
}
