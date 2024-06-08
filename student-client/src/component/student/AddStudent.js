import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddStudent = () => {
    let navigate = useNavigate();
    const [student, setStudent] = useState({
        firstName: "",
        lastName: "",
        email: "",
        departmentId: "", // Changed to departmentId
    });
    const [departments, setDepartments] = useState([]);

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

    const { firstName, lastName, email, departmentId } = student;

    const handleInputChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value,
        });
    };

	const saveStudent = async (e) => {
		e.preventDefault();
		try {
			await axios.post(`http://localhost:9192/students?departmentId=${departmentId}`, {
				firstName,
				lastName,
				email,
			});
			navigate("/view-students");
		} catch (error) {
			console.error("Error saving student:", error);
		}
	};

    return (
        <div className="col-sm-8 py-2 px-5 offset-2 shadow">
            <h2 className="mt-5"> Add Student</h2>
            <form onSubmit={(e) => saveStudent(e)}>
                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="firstName">First Name</label>
                    <input className="form-control col-sm-6" type="text" name="firstName" id="firstName" required value={firstName} onChange={(e) => handleInputChange(e)} />
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="lastName">Last Name</label>
                    <input className="form-control col-sm-6" type="text" name="lastName" id="lastName" required value={lastName} onChange={(e) => handleInputChange(e)} />
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="email">Your Email</label>
                    <input className="form-control col-sm-6" type="email" name="email" id="email" required value={email} onChange={(e) => handleInputChange(e)} />
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="departmentId">Department</label>
                    <select className="form-control col-sm-6" name="departmentId" id="departmentId" required value={departmentId} onChange={(e) => handleInputChange(e)}>
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>{dept.departmentName}</option>
                        ))}
                    </select>
                </div>

                <div className="row mb-5">
                    <div className="col-sm-2">
                        <button type="submit" className="btn btn-outline-success btn-lg">Save</button>
                    </div>

                    <div className="col-sm-2">
                        <Link to={"/view-students"} type="submit" className="btn btn-outline-warning btn-lg">Cancel</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddStudent;
