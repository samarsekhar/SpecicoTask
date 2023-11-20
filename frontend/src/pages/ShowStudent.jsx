import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowStudent = () => {
    const [list, setList] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:4001/students/${id}`)
            .then((response) => {
                setList(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, []);

    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-4">Show List</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">ID</span>
                        <span>{list._id}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">Teacher</span>
                        <span>{list.teacher}</span>
                    </div>
                    <div className="my-4">
                        <span className="text-xl mr-4 text-gray-500">Marks</span>
                        <span>{list.marks}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ShowStudent;