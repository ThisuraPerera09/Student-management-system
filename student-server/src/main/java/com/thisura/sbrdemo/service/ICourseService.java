package com.thisura.sbrdemo.service;

import com.thisura.sbrdemo.model.Course;

import java.util.List;

public interface ICourseService {
    Course addCourse(Course course,Long departmentId);
    List<Course> getAllCourses();
    Course updateCourse(Course course, Long id);
    Course getCourseById(Long id);
    void deleteCourse(Long id);
    List<Course> getCoursesByDepartmentId(Long departmentId);

}
