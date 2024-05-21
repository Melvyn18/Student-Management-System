import "./ListStudentsComponent.css";
import { useEffect, useState } from "react";
import { retrieveAllStudentsApi } from "../../api/StudentApiService";
import StudentComponent from "./StudentComponent/StudentComponent";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function ListStudentsComponent(){

    const [studentArray, setStudentArray] = useState([]);

    const [isError, setError] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => refreshStudents(), []);

    const token = Cookies.get('authorizationToken');

    function refreshStudents(){
        retrieveAllStudentsApi(token)
        .then(response => {
            setStudentArray(response.data)
            console.log(studentArray);
        })
        .catch(error => console.log(error))
    }

    return(
        <div className="list-students">
            <div className="studentData">
            {studentArray.map((student) => {
                return <StudentComponent 
                key={student.studentId} 
                studentId={student.studentId} 
                name={student.name} 
                birthDate={student.birthDate} 
                emailId={student.emailId} 
                address={student.address}
                refreshStudents={refreshStudents}
                setError={setError}
                setErrorMessage={setErrorMessage}/>
                })}
            </div>
            {isError && <p className="error-message">{errorMessage}</p>}
            <button className="addStudentButton">
                <Link to="/add-student">Add Student</Link>
            </button>
        </div>
        
    )
}