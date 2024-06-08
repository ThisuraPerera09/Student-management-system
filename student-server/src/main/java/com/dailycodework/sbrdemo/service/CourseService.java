package com.dailycodework.sbrdemo.service;

import com.dailycodework.sbrdemo.exception.CourseAlreadyExistsException;
import com.dailycodework.sbrdemo.exception.CourseNotFoundException;
import com.dailycodework.sbrdemo.exception.DepartmentNotFoundException;
import com.dailycodework.sbrdemo.model.Course;
import com.dailycodework.sbrdemo.model.Department;
import com.dailycodework.sbrdemo.repository.CourseRepository;
import com.dailycodework.sbrdemo.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService implements ICourseService {

    private final CourseRepository courseRepository;
    private final DepartmentRepository departmentRepository;

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Course addCourse(Course course, Long departmentId) {

        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new DepartmentNotFoundException("Department not found with id " + departmentId));
        course.setDepartment(department);
        return courseRepository.save(course);
    }


    @Override
    public Course updateCourse(Course course, Long id) {
        return courseRepository.findById(id)
                .map(c -> {
                    c.setCourseName(course.getCourseName());
                    c.setInstructor(course.getInstructor());
                    c.setCreditHours(course.getCreditHours());
                    // You may need to handle students registration here
                    return courseRepository.save(c);
                })
                .orElseThrow(() -> new CourseNotFoundException("Course not found with id " + id));
    }

    @Override
    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new CourseNotFoundException("Course not found with id " + id));
    }

    @Override
    public void deleteCourse(Long id) {
        if (!courseRepository.existsById(id)){
            throw new CourseNotFoundException("Course not found with id " + id);
        }
        courseRepository.deleteById(id);
    }

    public List<Course> getCoursesByDepartmentId(Long departmentId) {
        return courseRepository.findByDepartmentId(departmentId);
    }
}
