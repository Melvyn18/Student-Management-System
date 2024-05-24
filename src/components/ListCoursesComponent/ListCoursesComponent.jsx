import "./ListCoursesComponent.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setPopup } from "../../slices/popupSlice";
import { useEffect, useState } from "react";
import { retrieveAllCoursesApi } from "../../api/CourseApiService";
import CourseComponent from "./CourseComponent/CourseComponent";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import PopupComponent from "../PopupComponent/PopupComponent";

export default function ListCoursesComponent() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [courseArray, setCourseArray] = useState([]);

  const [isError, setError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const popup = useSelector((state) => state.popup.value);

  const deletedCourse = useSelector((state) => state.deletedCourse.value);

  const token = Cookies.get("authorizationToken");

  useEffect(() => refreshCourses(), []);

  function refreshCourses() {
    retrieveAllCoursesApi(token)
      .then((response) => {
        setCourseArray(response.data);
      })
      .catch((error) => console.log(error, "error-refreshCourses"));
  }

  function closePopup() {
    dispatch(setPopup(false));
  }

  function navigateToAddCourse() {
    navigate(`/add-course`);
  }

  return (
    <div>
      <div
        style={{ filter: popup ? "blur(5px)" : "none" }}
        className="list-courses"
      >
        <div className="courseData">
          {courseArray.map((course) => {
            return (
              <CourseComponent
                key={course.courseId}
                courseId={course.courseId}
                courseName={course.courseName}
                courseDescription={course.courseDescription}
                creditHours={course.creditHours}
                refreshCourses={refreshCourses}
                setError={setError}
                setErrorMessage={setErrorMessage}
              />
            );
          })}
        </div>
        
        {isError && <p className="error-message">{errorMessage}</p>}

        <button
          disabled={popup}
          className="addCourseButton"
          onClick={navigateToAddCourse}
        >
          Add Course
        </button>
      </div>

      <PopupComponent
        trigger={popup}
        heading={`Deleted Course !`}
        message={`Successfully deleted Course - ${deletedCourse}`}
        closePopup={closePopup}
      />
    </div>
  );
}
