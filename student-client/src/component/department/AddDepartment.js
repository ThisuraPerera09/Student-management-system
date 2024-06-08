import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddDepartment = () => {
    let navigate = useNavigate();
    const [department, setDepartment] = useState({
        departmentName: "",
        location: "",
    });

    const { departmentName, location } = department;

    const handleInputChange = (e) => {
        setDepartment({
            ...department,
            [e.target.name]: e.target.value,
        });
    };

    const saveDepartment = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:9192/departments", department);
            navigate("/view");
        } catch (error) {
            console.error("Error saving department:", error);
        }
    };

    return (
        <div className="col-sm-8 py-2 px-5 offset-2 shadow">
            <h2 className="mt-5">Add Department</h2>
            <form onSubmit={(e) => saveDepartment(e)}>
                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="departmentName">Department Name</label>
                    <input className="form-control col-sm-6" type="text" name="departmentName" id="departmentName" required value={departmentName} onChange={(e) => handleInputChange(e)} />
                </div>

                <div className="input-group mb-5">
                    <label className="input-group-text" htmlFor="location">Location</label>
                    <input className="form-control col-sm-6" type="text" name="location" id="location" required value={location} onChange={(e) => handleInputChange(e)} />
                </div>

                <div className="row mb-5">
                    <div className="col-sm-2">
                        <button type="submit" className="btn btn-outline-success btn-lg">Save</button>
                    </div>

                    <div className="col-sm-2">
                        <Link to={"/view-departments"} className="btn btn-outline-warning btn-lg">Cancel</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddDepartment;
