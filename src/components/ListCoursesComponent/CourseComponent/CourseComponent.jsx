import "./CourseComponent.css";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update"
import { useNavigate } from "react-router-dom";
import { deleteCourseApi } from "../../../api/CourseApiService";
import Cookies from "js-cookie";

export default function CourseComponent(props) {

  const navigate = useNavigate();

  const token = Cookies.get('authorizationToken');

  function handleDelete(id){
    console.log("Id is: " + id);
    deleteCourseApi(id, token)
    .then(respose => {
      console.log(respose)
      props.setError(false)
      props.setErrorMessage("")
      props.refreshCourses()
    })
    .catch(error => {
      console.log(error)
      props.setError(true)
      props.setErrorMessage(`${props.courseName} (${props.courseId}) has record in other tables`)
    })
  }

  function handleUpdate(id){
    navigate(`/update-course/${id}`);
  }

  return (
    <div className="course">
      <p className="id">{props.courseId}</p>
      <button className="updateButton" 
      onClick={() => handleUpdate(props.courseId)}
      >
        <UpdateIcon />
      </button>
      <p className="course-name">Course Name: {props.courseName}</p>
      <p className="course-description">Course Description: {props.courseDescription}</p>
      <p className="credit-hours">Credit Hours: {props.creditHours}</p>
      <button className="deleteButton"
       onClick={() => {handleDelete(props.courseId)}}
       >
        <DeleteIcon />
      </button>
    </div>
  );
}
