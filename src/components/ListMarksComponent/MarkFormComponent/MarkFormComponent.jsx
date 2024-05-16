import { useState, useEffect } from "react";
import "./MarkFormComponent.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { retrieveAllCoursesApi } from "../../../api/CourseApiService";
import { retrieveAllStudentsApi } from "../../../api/StudentApiService";
import { addMarkApi } from "../../../api/MarkApiService";
import { useNavigate } from "react-router-dom";
import StudentDropdownComponent from "../../ListRegistrationsComponent/RegistrationFormComponent/StudentDropdownComponent/StudentDropdownComponent";
import CourseDropdownComponent from "../../ListRegistrationsComponent/RegistrationFormComponent/CourseDropdownComponent/CourseDropdownComponent";
import AssessmentTypeComponent from "./AssessmentTypeComponent/AssessmentTypeComponent";

export default function MarkFormComponent() {
  useEffect(() => refreshStudentsAndCourses(), []);

  const navigate = useNavigate();

  const [isError, setError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

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

    const mark = {
      assessmentType: values.assessmentType,
      assessmentDate: values.assessmentDate,
      student: {},
      course: {},
      score: values.score
    };

    console.log(studentId);
    console.log(courseId);
    console.log(mark);

    addMarkApi(mark, studentId, courseId)
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          navigate("/marks");
          console.log("inside 200");
        } else {
          setError(true);
          console.log("inside else");
        }
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log("inside catch");
        if(error.response.status == 404){
          console.log("bad req", "bad req");
          setError(true);
          setErrorMessage("Student not registered for the course!");
        }
        else  if(error.response.status == 400){
          console.log("other req", "other req");
          setError(true)
          setErrorMessage("Record already present!");
        }
        
        setError(true);
      });
  }

  function validate(values) {
    setError(false)

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

    if(values.score == "" || values.score < 0){
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
    <div className="mark-form">
      <Formik
        initialValues={{
          studentId: "",
          courseId: "",
          assessmentType : "",
          assessmentDate : null,
          score: ""
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
            <Field type="number" name="score" placeholder="Provide score..." />
            <ErrorMessage
              name="score"
              render={(errorMessage) => (
                <div className="error-message">{errorMessage}</div>
              )}
            />
          </fieldset>

          <input
            style={style}
            className="mark-submit"
            type="submit"
            value="Submit"
          />
          {isError && (
            <p className="error-message error-paragraph">
              {errorMessage}
            </p>
          )}
        </Form>
      </Formik>
    </div>
  );
}
