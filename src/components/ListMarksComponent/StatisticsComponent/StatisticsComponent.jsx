import "./StatisticsComponent.css";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { retrieveAllCoursesApi } from "../../../api/CourseApiService";
import { retrieveAllStudentsApi } from "../../../api/StudentApiService";
import { retrieveAllMarksApi } from "../../../api/MarkApiService";
import StudentDropdownComponent from "../../ListRegistrationsComponent/RegistrationFormComponent/StudentDropdownComponent/StudentDropdownComponent";
import CourseDropdownComponent from "../../ListRegistrationsComponent/RegistrationFormComponent/CourseDropdownComponent/CourseDropdownComponent";
import MarkTableComponent from "./MarkTableComponent/MarkTableComponent";
import Cookies from "js-cookie";

export default function StatisticsComponent() {
  useEffect(() => refreshData(), []);

  const navigate = useNavigate();

  const [isError, setError] = useState(false);

  const [isCalculationError, setCalculationError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [courses, setCourses] = useState([]);

  const [students, setStudents] = useState([]);

  const [marks, setMarks] = useState([]);

  const [studentFilteredMarks, setStudentFilteredMarks] = useState([]);

  const [fieldValue, setFieldValue] = useState("");

  const [maxValue, setMaxValue] = useState(0);

  const [avgValue, setAvgValue] = useState(0);

  const [style, setStyle] = useState({
    marginTop: "20px",
  });

  const token = Cookies.get('authorizationToken');

  function refreshData() {
    retrieveAllCoursesApi(token)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => console.log(error));

    retrieveAllStudentsApi(token)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => console.log(error));

    retrieveAllMarksApi(token)
      .then((response) => {
        setMarks(response.data);
      })
      .catch((error) => console.log(error));
  }

  function onSubmit(values) {
    const studentId = parseInt(values.studentId);
    const courseId = parseInt(values.courseId);

    // const studentMarks = marks.filter(mark =>
    //     mark.student.studentId === studentId &&
    //     mark.course.courseid === courseId
    // );

    const studentMarks = [];

    marks.forEach((mark) => {
      if (
        mark.student.studentId == studentId &&
        mark.course.courseId == courseId
      ) {
        studentMarks.push(mark);
      }
    });

    setStudentFilteredMarks(studentMarks);

    console.log(studentFilteredMarks);

    console.log(studentMarks, "studentMarks");

    const studentscores = studentMarks.map((mark) => mark.score);

    try {
      const total = studentscores.reduce((total, val) => total + val);
      const length = studentscores.length;

      if (fieldValue == "Maximum") {
        setMaxValue(Math.max(...studentscores));
        console.log(maxValue, "maximum");
      } 
      else if (fieldValue == "Average") {
        setAvgValue(total / length);
        console.log(avgValue, "average");
      }

      setCalculationError(false);
    } catch {
      console.log("Error");
      setCalculationError(true);
      setError(true);
      setErrorMessage("Student has not written any tests in this course!");
    }
  }

  function validate(values) {
    setError(false);
    setCalculationError(true);

    let errors = {};

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
    <div className="statistics">
      <Formik
        initialValues={{
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
          <StudentDropdownComponent students={students} />

          <CourseDropdownComponent courses={courses} />

          <div className="stat-buttons">
            <input
              style={style}
              onClick={() => setFieldValue("Maximum")}
              className="statistics-max"
              type="submit"
              value="Maximum"
            />

            <input
              style={style}
              onClick={() => setFieldValue("Average")}
              className="statistics-avg"
              type="submit"
              value="Average"
            />
          </div>

          {isError && (
            <p className="error-message error-paragraph">{errorMessage}</p>
          )}
        </Form>
      </Formik>

      <MarkTableComponent 
      fieldValue={fieldValue}
      isError={isError}
      isCalculationError={isCalculationError}
      maxValue={maxValue}
      avgValue={avgValue}
      studentFilteredMarks={studentFilteredMarks}
      />

    </div>
  );
}
