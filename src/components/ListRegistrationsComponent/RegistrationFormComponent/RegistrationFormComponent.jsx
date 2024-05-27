import { useState, useEffect } from "react";
import "./RegistrationFormComponent.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setPopup } from "../../../slices/popupSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { retrieveAllCoursesApi } from "../../../api/CourseApiService";
import { retrieveAllStudentsApi } from "../../../api/StudentApiService";
import { addRegistrationApi } from "../../../api/RegistrationApiService";
import { useNavigate } from "react-router-dom";
import StudentDropdownComponent from "./StudentDropdownComponent/StudentDropdownComponent";
import CourseDropdownComponent from "./CourseDropdownComponent/CourseDropdownComponent";
import Cookies from "js-cookie";
import PopupComponent from "../../PopupComponent/PopupComponent";

export default function RegistrationFormComponent() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isError, setError] = useState(false);

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
    navigate("/registrations");
  }

  function onSubmit(values) {

    const studentId = values.studentId;
    const courseId = values.courseId;

    const registration = {
      registrationId: values.registrationId,
      registrationDate: values.registrationDate,
      student: {},
      course: {},
    };

    addRegistrationApi(registration, studentId, courseId, token)
      .then((response) => {
        if (response.status === 201) {
          setStudentId(studentId);
          setCourseId(courseId);
          dispatch(setPopup(true));
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        console.log(error.ErrorMessage, "error message");
        setError(true);
      });
  }

  function validate(values) {
    setError(false);

    let errors = {};

    if (values.registrationDate === null || values.registrationDate === "") {
      errors.registrationDate = "Provide a registration date";
      setStyle({ marginTop: "10px" });
    }

    if (values.courseId === undefined || values.courseId === "") {
      errors.courseId = "Select a Course";
      setStyle({ marginTop: "10px" });
    }

    if (values.studentId === undefined || values.studentId === "") {
      errors.studentId = "Select a Student";
      setStyle({ marginTop: "10px" });
    }

    return errors;
  }

  return (
    <div>
      <div
        style={{ filter: popup ? "blur(5px)" : "none" }}
        className="registration-form"
      >
        <Formik
          initialValues={{
            registrationId: null,
            registrationDate: "",
            courseId: "",
            studentId: "",
          }}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          <Form>
            <fieldset>
              <label htmlFor="registrationDate">Registration Date:</label>
              <Field
                type="date"
                name="registrationDate"
                placeholder="Provide registration date..."
              />
              <ErrorMessage
                name="registrationDate"
                render={(errorMessage) => (
                  <div className="error-message">{errorMessage}</div>
                )}
              />
            </fieldset>

            <StudentDropdownComponent students={students} />

            <CourseDropdownComponent courses={courses} />

            <input
              disabled={popup}
              style={style}
              className="registration-submit"
              type="submit"
              value="Submit"
            />
            {isError && (
              <p className="error-message error-paragraph">
                Student already registered!
              </p>
            )}
          </Form>
        </Formik>
      </div>

      <PopupComponent
        trigger={popup}
        heading={"Registration done !"}
        message={`Successfully registered Course[${courseId}] for Student[${studentId}]`}
        closePopup={closePopup}
      />
    </div>
  );
}
