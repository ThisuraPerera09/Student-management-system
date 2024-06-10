package com.thisura.sbrdemo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String courseName;
    private String instructor;
    private int creditHours;
    // Assuming a course can have many students
    // and each student can take only one course
    @ManyToOne
    private Department department;

    @ManyToMany(mappedBy = "courses")
    private List<Student> students;

}

