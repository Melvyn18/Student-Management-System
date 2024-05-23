import "./AddStudentComponent.css";
import StudentFormComponent from "../StudentFormComponent/StudentFormComponent";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { retrieveStudentApi } from "../../../api/StudentApiService";
import Cookies from "js-cookie";

export default function AddStudentComponent() {

  const {id} = useParams();

  const [student, setStudent] = useState({});

  let popup = useSelector(state => state.popup.value);

  const token = Cookies.get('authorizationToken');

  useEffect(() => {
    async function fetchStudent(){
      console.log(id);
      if(id !== undefined){
        const response = await retrieveStudentApi(id, token);
      setStudent(response.data);
      }
      
    };
    fetchStudent()
    
  }, []);

  

  return (
    <div>
      <div style={{filter: popup ? "blur(5px)" : "none"}} className="add-student-component">
      <h2>Enter Student Data</h2>
      
    </div>
    <StudentFormComponent student={student}/>
    </div>
    
  );
}
