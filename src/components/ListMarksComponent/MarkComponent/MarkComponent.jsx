import "./MarkComponent.css";
import { useDispatch } from "react-redux";
import { setPopup } from "../../../slices/popupSlice";
import { setDeletedMark } from "../../../slices/deletedMarkSlice";
import { setDeletedStudent } from "../../../slices/deletedStudentSlice";
import { setDeletedCourse } from "../../../slices/deletedCourseSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteMarkApi } from "../../../api/MarkApiService";
import Cookies from "js-cookie";

export default function MarkComponent(props) {

  const dispatch = useDispatch();

  const token = Cookies.get('authorizationToken');

  function handleDelete(id){
    console.log("Mark Id is: " + id, "deleted Id");
    deleteMarkApi(id, token)
    .then(() => {
      dispatch(setDeletedMark(props.assessmentType));
      dispatch(setDeletedStudent(props.student.name));
      dispatch(setDeletedCourse(props.course.courseName));
      dispatch(setPopup(true));
      props.refreshMarks();
    })
    .catch(error => {
      console.log(error, "error-handleDelete");
    })
  }

  return (
    <div className="mark">
      <p className="id">{props.id}</p>
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
