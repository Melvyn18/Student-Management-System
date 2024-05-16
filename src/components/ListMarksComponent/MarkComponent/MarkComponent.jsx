import "./MarkComponent.css";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update"
import { useNavigate } from "react-router-dom";
import { deleteMarkApi } from "../../../api/MarkApiService";

export default function MarkComponent(props) {

  // const navigate = useNavigate();

  function handleDelete(id){
    console.log("Mark Id is: " + id);
    deleteMarkApi(id)
    .then(respose => {
      props.refreshMarks()
    })
    .catch(error => {
      console.log(error)
    })
  }

  // function handleUpdate(id){
  //   navigate(`/update-course/${id}`);
  // }

  return (
    <div className="mark">
      <p className="id">{props.id}</p>
      {/* <button className="updateButton" 
      onClick={() => handleUpdate(props.registrationId)}
      >
        <UpdateIcon />
      </button> */}
      <p className="score">Score: {props.score}</p>
      <p className="registration-student">Student: {props.student.name} ({props.student.studentId})</p>
      <p className="registration-course">Course: {props.course.courseName} ({props.course.courseId})</p>
      <p className="assessment-type">Assessment Type: {props.assessmentType}</p>
      <p className="assessment-date">Assessment Date: {props.assessmentDate}</p>
     
      <button className="deleteButton"
       onClick={() => {handleDelete(props.id)}}
       >
        <DeleteIcon />
      </button>
    </div>
  );
}
