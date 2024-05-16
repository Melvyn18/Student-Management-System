import "./StudentComponent.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteStudentApi } from "../../../api/StudentApiService";
import UpdateIcon from "@mui/icons-material/Update"
import { useNavigate } from "react-router-dom";

export default function StudentComponent(props) {

  const navigate = useNavigate();

  function handleDelete(id){
    console.log("Id is: " + id);
    deleteStudentApi(id)
    .then(respose => {
      console.log(respose)
      props.setError(false)
      props.setErrorMessage("")
      props.refreshStudents()
    })
    .catch(error => {
      console.log(error)
      props.setError(true)
      props.setErrorMessage(`${props.name} (${props.studentId}) has record in other tables`)
    })
  }

  function handleUpdate(id){
    navigate(`/update-student/${id}`);
  }

  return (
    <div className="student">
      <p className="id">{props.studentId}</p>
      <button className="updateButton" onClick={() => handleUpdate(props.studentId)}>
        <UpdateIcon />
      </button>
      <p className="name">Name: {props.name}</p>
      <p className="birthDate">Birth Date: {props.birthDate}</p>
      <p className="emailId">Email Id: {props.emailId}</p>
      <p className="address">Address: {props.address}</p>
      <button className="deleteButton" onClick={() => {handleDelete(props.studentId)}}>
        <DeleteIcon />
      </button>
    </div>
  );
}
