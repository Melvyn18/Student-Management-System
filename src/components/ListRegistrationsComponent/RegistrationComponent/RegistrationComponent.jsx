import "./RegistrationComponent.css";
import { useDispatch } from "react-redux";
import { setPopup } from "../../../slices/popupSlice";
import { setDeletedRegistration } from "../../../slices/deletedRegistrationSlice";
import { setDeletedStudent } from "../../../slices/deletedStudentSlice";
import { setDeletedCourse } from "../../../slices/deletedCourseSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteRegistrationApi } from "../../../api/RegistrationApiService";
import Cookies from "js-cookie";

export default function RegistrationComponent(props) {

  const dispatch = useDispatch();

  const token = Cookies.get('authorizationToken');

  function handleDelete(id){
    deleteRegistrationApi(id, token)
    .then(() => {
      dispatch(setDeletedRegistration(props.registrationId));
      dispatch(setDeletedStudent(props.student.name));
      dispatch(setDeletedCourse(props.course.courseName));
      dispatch(setPopup(true));
      props.refreshRegistrations();
    })
    .catch(error => {
      console.log(error, "error-handleDelete");
    })
  }

  return (
    <div className="registration">
      <p className="id">{props.registrationId}</p>
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
