package com.dailycodework.sbrdemo.service;

import com.dailycodework.sbrdemo.model.Student;

import java.util.List;

public interface IStudentService {
    Student addStudent(Student student, Long departmentId);
    List<Student> getStudents();
    Student updateStudent(Student student, Long id);
    Student getStudentById(Long id);
    void deleteStudent(Long id);
    List<Student> getStudentsByDepartmentId(Long departmentId);

    Student updateStudentWithCourses(Student student, Long id, List<Long> courseIds);


    
    
}
