package com.thisura.sbrdemo.repository;

import com.thisura.sbrdemo.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * @author Simpson Alfred
 */

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByEmail(String email);
    List<Student> findByDepartmentId(Long departmentId);

}
