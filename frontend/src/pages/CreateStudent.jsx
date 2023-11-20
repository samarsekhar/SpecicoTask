import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateStudents = () => {
    const [student, setStudent] = useState('');
    const [teacher, setTeacher] = useState('');
    const [marks, setMarks] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleStudent = () => {
        const data = { student, teacher, marks };
        setLoading(true);
        axios.post('http://localhost:4001/students', data)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened, Please Check console');
                console.log(error);
            });
    }

    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-4">Create Student</h1>
            {loading ? <Spinner /> : ''}
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Student</label>
                    <input type="text" value={student} onChange={(e) => setStudent(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full" />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Teacher</label>
                    <input type="text" value={teacher} onChange={(e) => setTeacher(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full" />
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Marks</label>
                    <input type="number" value={marks} onChange={(e) => setMarks(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full" />
                </div>
                <button className="p-2 bg-sky-300 m-8" onClick={handleStudent}>Save</button>
            </div>
        </div>
    )
}

export default CreateStudents;