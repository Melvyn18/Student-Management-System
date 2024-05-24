import { useState, useEffect } from "react";
import "./MarkFormComponent.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setPopup } from "../../../slices/popupSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { retrieveAllCoursesApi } from "../../../api/CourseApiService";
import { retrieveAllStudentsApi } from "../../../api/StudentApiService";
import { addMarkApi } from "../../../api/MarkApiService";
import { useNavigate } from "react-router-dom";
import StudentDropdownComponent from "../../ListRegistrationsComponent/RegistrationFormComponent/StudentDropdownComponent/StudentDropdownComponent";
import CourseDropdownComponent from "../../ListRegistrationsComponent/RegistrationFormComponent/CourseDropdownComponent/CourseDropdownComponent";
import AssessmentTypeComponent from "./AssessmentTypeComponent/AssessmentTypeComponent";
import Cookies from "js-cookie";
import PopupComponent from "../../PopupComponent/PopupComponent";

export default function MarkFormComponent() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isError, setError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [courses, setCourses] = useState([]);

  const [students, setStudents] = useState([]);

  const [courseId, setCourseId] = useState("");

  const [studentId, setStudentId] = useState("");

  const [style, setStyle] = useState({
    marginTop: "20px",
  });

  const popup = useSelector((state) => state.popup.value);

  const token = Cookies.get("authorizationToken");

  useEffect(() => refreshStudentsAndCourses(), []);

  function refreshStudentsAndCourses() {
    retrieveAllCoursesApi(token)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => console.log(error, "error-refreshStudentsAndCourses"));

    retrieveAllStudentsApi(token)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => console.log(error, "error-refreshStudentsAndCourses"));
  }

  function closePopup() {
    dispatch(setPopup(false));
    navigate("/marks");
  }

  function onSubmit(values) {

    const studentId = values.studentId;
    const courseId = values.courseId;

    const mark = {
      assessmentType: values.assessmentType,
      assessmentDate: values.assessmentDate,
      student: {},
      course: {},
      score: values.score,
    };

    addMarkApi(mark, studentId, courseId, token)
      .then((response) => {
        if (response.status == 201) {
          setStudentId(studentId);
          setCourseId(courseId);
          dispatch(setPopup(true));
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        console.log(error.response.status, "error response status");
        if (error.response.status == 404) {
          setError(true);
          setErrorMessage("Student not registered for the course!");
        } else if (error.response.status == 409) {
          setError(true);
          setErrorMessage("Record already present!");
        } else if (error.response.status == 400) {
          setError(true);
          setErrorMessage("Please enter again with appropriate data!");
        }
      });
  }

  function validate(values) {
    setError(false);

    let errors = {};

    if (values.assessmentType == null || values.assessmentType == "") {
      errors.assessmentType = "Provide assessment type";
      setStyle({ marginTop: "10px" });
    }

    if (values.courseId == undefined || values.courseId == "") {
      errors.courseId = "Select a Course";
      setStyle({ marginTop: "10px" });
    }

    if (values.studentId == undefined || values.studentId == "") {
      errors.studentId = "Select a Student";
      setStyle({ marginTop: "10px" });
    }

    if (values.score == "" || values.score < 0 || values.score > 100) {
      errors.score = "Provide a valid score";
      setStyle({ marginTop: "10px" });
    }

    if (values.assessmentDate == null || values.assessmentDate == "") {
      errors.assessmentDate = "Provide an assessment date";
      setStyle({ marginTop: "10px" });
    }

    return errors;
  }

  return (
    <div>
      <div
        style={{ filter: popup ? "blur(5px)" : "none" }}
        className="mark-form"
      >
        <Formik
          initialValues={{
            studentId: "",
            courseId: "",
            assessmentType: "",
            assessmentDate: null,
            score: "",
          }}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          <Form>
            <StudentDropdownComponent students={students} />

            <CourseDropdownComponent courses={courses} />

            <AssessmentTypeComponent />

            <fieldset>
              <label htmlFor="assessmentDate">Assessment Date:</label>
              <Field
                type="date"
                name="assessmentDate"
                placeholder="Provide assessmentDate date..."
              />
              <ErrorMessage
                name="assessmentDate"
                render={(errorMessage) => (
                  <div className="error-message">{errorMessage}</div>
                )}
              />
            </fieldset>

            <fieldset>
              <label htmlFor="score">Score:</label>
              <Field
                type="number"
                name="score"
                placeholder="Provide score..."
              />
              <ErrorMessage
                name="score"
                render={(errorMessage) => (
                  <div className="error-message">{errorMessage}</div>
                )}
              />
            </fieldset>

            <input
              disabled={popup}
              style={style}
              className="mark-submit"
              type="submit"
              value="Submit"
            />
            {isError && (
              <p className="error-message error-paragraph">{errorMessage}</p>
            )}
          </Form>
        </Formik>
      </div>

      <PopupComponent
        trigger={popup}
        heading={"Mark added !"}
        message={`Added mark for Student[${studentId}] on Course[${courseId}]`}
        closePopup={closePopup}
      />
    </div>
  );
}
