import "./AddStudentComponent.css";
import StudentFormComponent from "../StudentFormComponent/StudentFormComponent";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { retrieveStudentApi } from "../../../api/StudentApiService";
import Cookies from "js-cookie";

export default function AddStudentComponent() {

  const {id} = useParams();

  const [student, setStudent] = useState({});

  const token = Cookies.get('authorizationToken');

  useEffect(() => {
    async function fetchStudent(){
      console.log(id);
      if(id !== undefined){
        const response = await retrieveStudentApi(id, token);
      // console.log(response);
      setStudent(response.data);
      // console.log(student);
      }
      
    };
    fetchStudent()
    
  }, []);

  

  return (
    <div className="add-student-component">
      <h2>Enter Student Data</h2>
      <StudentFormComponent student={student}/>
    </div>
  );
}
