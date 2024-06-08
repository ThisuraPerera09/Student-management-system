import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

const DepartmentProfile = () => {
    const { id } = useParams();

    const [department, setDepartment] = useState({
        name: "",
        head: "",
        facultyCount: "",
        studentCount: "",
        courses: []  // Initialize with an empty array for courses
    });

    const [students, setStudents] = useState([]); // State for students

    const [course, setCourse] = useState({
        courseName: "",
        instructor: "",
        creditHours: ""
    });

    useEffect(() => {
        loadDepartment();
        loadCourses();
        loadStudents(); // Load students when component mounts
    }, []);

    const loadDepartment = async () => {
        const result = await axios.get(`http://localhost:9192/departments/department/${id}`);
        setDepartment(result.data);
    };

    const loadCourses = async () => {
        const result = await axios.get(`http://localhost:9192/courses/department/${id}`);
        setDepartment(prevState => ({
            ...prevState,
            courses: result.data
        }));
    };

    const loadStudents = async () => {
        const result = await axios.get(`http://localhost:9192/students/department/${id}`);
        setStudents(result.data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourse({ ...course, [name]: value });
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:9192/courses?departmentId=${id}`, course);
        loadCourses(); // Reload courses after adding a new one
        setCourse({
            courseName: "",
            instructor: "",
            creditHours: ""
        });
    };

    const handleDeleteCourse = async (courseId) => {
        await axios.delete(`http://localhost:9192/courses/${courseId}`);
        loadCourses(); // Reload courses after deleting
    };

    const handleEditCourse = (courseId) => {
        // Handle course edit functionality
        // You might want to set the course data to the form for editing
    };

    const handleViewCourse = (courseId) => {
        // Handle course view functionality
        // You might want to redirect to a course detail page
    };

    return (
        <section className="shadow" style={{ backgroundColor: "whitesmoke" }}>
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="card mb-4">
                            <div className="card-body text-center">
                                <h5 className="my-3">{department.name}</h5>
                                <div>
                                    <h6 className="mb-3">Students</h6>
                                    {students.length > 0 ? (
                                        <ul className="list-group">
                                            {students.map(student => (
                                                <li key={student.id} className="list-group-item">
                                                  {student.id}   {student.firstName}   {student.lastName}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No students available.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="card mb-4">
                            <div className="card-body">
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h5 className="mb-0">Department Name</h5>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{department.departmentName}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h5 className="mb-0">Department Location</h5>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{department.location}</p>
                                    </div>
                                </div>
                                <hr />
                                <h5 className="mb-4">Courses</h5>
                                {department.courses && department.courses.length > 0 ? (
                                    <ul className="list-group">
                                        {department.courses.map((course) => (
                                            <li key={course.id} className="list-group-item d-flex justify-content-between align-items-center">
                                                <div>
                                                    {course.courseName} - {course.instructor} ({course.creditHours} credit hours)
                                                </div>
                                                <div>
                                                    <button
                                                        className="btn btn-outline-primary btn-sm me-2"
                                                        onClick={() => handleViewCourse(course.id)}
                                                    >
                                                        <FaEye />
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-warning btn-sm me-2"
                                                        onClick={() => handleEditCourse(course.id)}
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() => handleDeleteCourse(course.id)}
                                                    >
                                                        <FaTrashAlt />
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No courses available.</p>
                                )}
                                <hr />
                                <h5 className="mb-4">Add Course</h5>
                                <form onSubmit={handleAddCourse}>
                                    <div className="mb-3">
                                        <label htmlFor="courseName" className="form-label">Course Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="courseName"
                                            name="courseName"
                                            value={course.courseName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="instructor" className="form-label">Instructor</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="instructor"
                                            name="instructor"
                                            value={course.instructor}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="creditHours" className="form-label">Credit Hours</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="creditHours"
                                            name="creditHours"
                                            value={course.creditHours}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Add Course</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DepartmentProfile;
