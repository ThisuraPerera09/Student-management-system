package com.dailycodework.sbrdemo.service;

import com.dailycodework.sbrdemo.exception.CourseNotFoundException;
import com.dailycodework.sbrdemo.exception.DepartmentNotFoundException;
import com.dailycodework.sbrdemo.exception.StudentAlreadyExistsException;
import com.dailycodework.sbrdemo.exception.StudentNotFoundException;
import com.dailycodework.sbrdemo.model.Course;
import com.dailycodework.sbrdemo.model.Department;
import com.dailycodework.sbrdemo.model.Student;
import com.dailycodework.sbrdemo.repository.CourseRepository;
import com.dailycodework.sbrdemo.repository.DepartmentRepository;
import com.dailycodework.sbrdemo.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Simpson Alfred
 */

@Service
@RequiredArgsConstructor
public class StudentService implements IStudentService{
    private final StudentRepository studentRepository;
    private final DepartmentRepository departmentRepository;

    @Override
    public List<Student> getStudents() {
        return studentRepository.findAll();
    }
    @Override
    public Student addStudent(Student student, Long departmentId) {
        if (studentAlreadyExists(student.getEmail())) {
            throw new StudentAlreadyExistsException(student.getEmail() + " already exists!");
        }
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new DepartmentNotFoundException("Course not found with id " + departmentId));
        student.setDepartment(department);
        return studentRepository.save(student);
    }



    @Override
    public Student updateStudent(Student student, Long id) {
        return studentRepository.findById(id).map(st -> {
            st.setFirstName(student.getFirstName());
            st.setLastName(student.getLastName());
            st.setEmail(student.getEmail());
            st.setDepartment(student.getDepartment());
            return studentRepository.save(st);
        }).orElseThrow(() -> new StudentNotFoundException("Sorry, this student could not be found"));
    }

    @Override
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Sorry, no student found with the Id :" +id));
    }

    @Override
    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)){
            throw new StudentNotFoundException("Sorry, student not found");
        }
        studentRepository.deleteById(id);
    }

    @Override
    public List<Student> getStudentsByDepartmentId(Long departmentId) {
        return studentRepository.findByDepartmentId(departmentId);
    }


    @Override
    public Student updateStudentWithCourses(Student student, Long id, List<Long> courseIds) {
        Student existingStudent = studentRepository.findById(id).orElse(null);
        if (existingStudent != null) {
            existingStudent.setFirstName(student.getFirstName());
            existingStudent.setLastName(student.getLastName());
            existingStudent.setEmail(student.getEmail());
            // Set other fields as needed

            // Update the course IDs
            existingStudent.setCourseIds(courseIds);

            return studentRepository.save(existingStudent);
        }
        return null;
    }
    private boolean studentAlreadyExists(String email) {
        return studentRepository.findByEmail(email).isPresent();
    }
}