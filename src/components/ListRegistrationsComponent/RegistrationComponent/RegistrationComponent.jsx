import "./RegistrationComponent.css";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update"
import { useNavigate } from "react-router-dom";
import { deleteRegistrationApi } from "../../../api/RegistrationApiService";
import Cookies from "js-cookie";

export default function RegistrationComponent(props) {

  // const navigate = useNavigate();

  const token = Cookies.get('authorizationToken');

  function handleDelete(id){
    console.log("Registration Id is: " + id);
    deleteRegistrationApi(id, token)
    .then(respose => {
      props.refreshRegistrations()
    })
    .catch(error => {
      console.log(error)
    })
  }

  // function handleUpdate(id){
  //   navigate(`/update-course/${id}`);
  // }

  return (
    <div className="registration">
      <p className="id">{props.registrationId}</p>
      {/* <button className="updateButton" 
      onClick={() => handleUpdate(props.registrationId)}
      >
        <UpdateIcon />
      </button> */}
      <p className="registration-date">Registration Date: {props.registrationDate}</p>
      <p className="registration-student">Student: {props.student.name} ({props.student.studentId})</p>
      <p className="registration-course">Course: {props.course.courseName} ({props.course.courseId})</p>
      <button className="deleteButton"
       onClick={() => {handleDelete(props.registrationId)}}
       >
        <DeleteIcon />
      </button>
    </div>
  );
}
