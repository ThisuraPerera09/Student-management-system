import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

const ViewDepartments = () => {
    const [departments, setDepartments] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get("http://localhost:9192/departments");
            setDepartments(response.data);
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:9192/departments/delete/${id}`);
            fetchDepartments();
        } catch (error) {
            console.error("Error deleting department:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">View Departments</h2>
            <input
                type="text"
                className="form-control mb-4"
                placeholder="Search by department name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <table className="table table-bordered table-hover shadow">
                <thead className="text-center">
                    <tr>
                        <th>ID</th>
                        <th>Department Name</th>
                        <th>Location</th>
                        <th colSpan="3">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {departments
                        .filter((dept) => dept.departmentName.toLowerCase().includes(search.toLowerCase()))
                        .map((dept, index) => (
                            <tr key={dept.id}>
                                <td>{index + 1}</td>
                                <td>{dept.departmentName}</td>
                                <td>{dept.location}</td>
                                <td className="mx-2">
                                    <Link to={`/department-profile/${dept.id}`} className="btn btn-info">
                                        <FaEye />
                                    </Link>
                                </td>
                                <td className="mx-2">
                                    <Link to={`/edit-department/${dept.id}`} className="btn btn-warning">
                                        <FaEdit />
                                    </Link>
                                </td>
                                <td className="mx-2">
                                    <button onClick={() => handleDelete(dept.id)} className="btn btn-danger">
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewDepartments;
