import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditStudent = () => {
    let navigate = useNavigate();
    const { id } = useParams();

    const [student, setStudent] = useState({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        courses: [], // Add courses field to track selected courses
    });

    const [departmentCourses, setDepartmentCourses] = useState([]); // State for courses in the department

    const { firstName, lastName, email, department, courses } = student;

    useEffect(() => {
        loadStudent();
    }, []);

    useEffect(() => {
        if (department) {
            loadCourses();
        }
    }, [department]);

    const loadStudent = async () => {
        const result = await axios.get(`http://localhost:9192/students/student/${id}`);
        setStudent(result.data);
    };

    const loadCourses = async () => {
        const result = await axios.get(`http://localhost:9192/courses/department/${department.id}`);
        setDepartmentCourses(result.data);
    };

    const handleInputChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value,
        });
    };

    const handleCheckboxChange = (courseId) => {
        setStudent((prevState) => {
            const newCourses = prevState.courses.includes(courseId)
                ? prevState.courses.filter((id) => id !== courseId)
                : [...prevState.courses, courseId];
            return {
                ...prevState,
                courses: newCourses,
            };
        });
    };

    const updateStudent = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:9192/students/update/${id}`, student);
        navigate("/view-students");
    };

    return (
        <div className="col-sm-8 py-2 px-5 offset-2 shadow">
            <h2 className="mt-5"> Edit Student</h2>
            <form onSubmit={(e) => updateStudent(e)}>
                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        className="form-control col-sm-6"
                        type="text"
                        name="firstName"
                        id="firstName"
                        required
                        value={firstName}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        className="form-control col-sm-6"
                        type="text"
                        name="lastName"
                        id="lastName"
                        required
                        value={lastName}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="email">
                        Your Email
                    </label>
                    <input
                        className="form-control col-sm-6"
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="department">
                        Department
                    </label>
                    <input
                        className="form-control col-sm-6"
                        type="text"
                        name="department"
                        id="department"
                        required
                        value={department.departmentName}
                        onChange={(e) => handleInputChange(e)}
                        readOnly
                    />
                </div>

                <div className="mb-5">
                    <h5>Add Courses</h5>
                    {departmentCourses.length > 0 ? (
                        departmentCourses.map((course) => (
                            <div className="form-check" key={course.id}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={course.id}
                                    id={`course-${course.id}`}
                                    checked={courses.includes(course.id)}
                                    onChange={() => handleCheckboxChange(course.id)}
                                />
                                <label className="form-check-label" htmlFor={`course-${course.id}`}>
                                    {course.courseName} - {course.instructor} ({course.creditHours} credit hours)
                                </label>
                            </div>
                        ))
                    ) : (
                        <p>No courses available.</p>
                    )}
                </div>

                <div className="row mb-5">
                    <div className="col-sm-2">
                        <button type="submit" className="btn btn-outline-success btn-lg">
                            Save
                        </button>
                    </div>

                    <div className="col-sm-2">
                        <Link to={"/view-students"} type="button" className="btn btn-outline-warning btn-lg">
                            Cancel
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditStudent;
