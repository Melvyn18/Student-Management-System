import { useState, useEffect } from "react";
import "./RegistrationFormComponent.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { retrieveAllCoursesApi } from "../../../api/CourseApiService";
import { retrieveAllStudentsApi } from "../../../api/StudentApiService";
import { addRegistrationApi } from "../../../api/RegistrationApiService";
import { useNavigate } from "react-router-dom";
import StudentDropdownComponent from "./StudentDropdownComponent/StudentDropdownComponent";
import CourseDropdownComponent from "./CourseDropdownComponent/CourseDropdownComponent";

export default function RegistrationFormComponent() {
  useEffect(() => refreshStudentsAndCourses(), []);

  const navigate = useNavigate();

  const [isError, setError] = useState(false);

  const [courses, setCourses] = useState([]);

  const [students, setStudents] = useState([]);

  const [style, setStyle] = useState({
    marginTop: "20px",
  });

  function refreshStudentsAndCourses() {
    retrieveAllCoursesApi()
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => console.log(error));

    retrieveAllStudentsApi()
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => console.log(error));
  }

  function onSubmit(values) {
    console.log(values);

    const studentId = values.studentId;
    const courseId = values.courseId;

    const registration = {
      registrationId: values.registrationId,
      registrationDate: values.registrationDate,
      student: {},
      course: {},
    };

    addRegistrationApi(registration, studentId, courseId)
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          navigate("/registrations");
          console.log("inside 200");
        } else {
          setError(true);
          console.log("inside else");
        }
      })
      .catch((error) => {
        console.log(error.ErrorMessage);
        console.log("inside catch");
        setError(true);
      });
  }

  function validate(values) {
    setError(false)

    let errors = {};

    if (values.registrationDate == null || values.registrationDate == "") {
      errors.registrationDate = "Provide a registration date";
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

    return errors;
  }

  return (
    <div className="registration-form">
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

          <CourseDropdownComponent courses={courses} />

          <StudentDropdownComponent students={students} />

          <input
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
  );
}
