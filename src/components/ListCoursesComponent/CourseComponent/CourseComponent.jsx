import "./CourseComponent.css";
import { useDispatch } from "react-redux";
import { setPopup } from "../../../slices/popupSlice";
import { setDeletedCourse } from "../../../slices/deletedCourseSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import { useNavigate } from "react-router-dom";
import { deleteCourseApi } from "../../../api/CourseApiService";
import Cookies from "js-cookie";

export default function CourseComponent(props) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const token = Cookies.get("authorizationToken");

  function handleDelete(id) {
    console.log("Id is: " + id);
    deleteCourseApi(id, token)
      .then(() => {
        props.setError(false);
        props.setErrorMessage("");
        dispatch(setDeletedCourse(`${props.courseName}[${props.courseId}]`));
        dispatch(setPopup(true));
        props.refreshCourses();
      })
      .catch((error) => {
        console.log(error, "error-handleDelete");
        props.setError(true);
        props.setErrorMessage(
          `${props.courseName} [${props.courseId}] has record in other tables`
        );
      });
  }

  function handleUpdate(id) {
    navigate(`/update-course/${id}`);
  }

  return (
    <div className="course">
      <p className="id">{props.courseId}</p>

      <button
        className="updateButton"
        onClick={() => handleUpdate(props.courseId)}
      >
        <UpdateIcon />
      </button>

      <p className="course-name">Course Name: {props.courseName}</p>
      <p className="course-description">
        Course Description: {props.courseDescription}
      </p>
      <p className="credit-hours">Credit Hours: {props.creditHours}</p>
      
      <button
        className="deleteButton"
        onClick={() => {
          handleDelete(props.courseId);
        }}
      >
        <DeleteIcon />
      </button>
    </div>
  );
}
