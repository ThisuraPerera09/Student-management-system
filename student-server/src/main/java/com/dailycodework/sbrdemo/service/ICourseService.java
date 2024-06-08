package com.dailycodework.sbrdemo.service;

import com.dailycodework.sbrdemo.model.Course;

import java.util.List;

public interface ICourseService {
    Course addCourse(Course course,Long departmentId);
    List<Course> getAllCourses();
    Course updateCourse(Course course, Long id);
    Course getCourseById(Long id);
    void deleteCourse(Long id);
    List<Course> getCoursesByDepartmentId(Long departmentId);

}
