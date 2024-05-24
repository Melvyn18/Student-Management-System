import { useState } from "react";
import "./CourseFormComponent.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setPopup } from "../../../slices/popupSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addCourseApi } from "../../../api/CourseApiService";
import { updateCourseApi } from "../../../api/CourseApiService";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import PopupComponent from "../../PopupComponent/PopupComponent";

export default function CourseFormComponent(props) {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isError, setError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [courseName, setCourseName] = useState("");

  const [operation, setOperation] = useState("");

  const [style, setStyle] = useState({
    marginTop: "20px",
  });

  const popup = useSelector((state) => state.popup.value);  

  const token = Cookies.get("authorizationToken");

  function closePopup() {
    dispatch(setPopup(false));
    navigate("/courses");
  }

  function onSubmit(values) {

    const course = {
      courseId: props.course.courseId,
      courseName: values.courseName,
      courseDescription: values.courseDescription,
      creditHours: values.creditHours,
    };

    if (values.courseId !== undefined) {

      updateCourseApi(course, token)
        .then(() => {
          setOperation("updated");
          setCourseName(values.courseName);
          dispatch(setPopup(true));
        })
        .catch((error) => {
          console.log(error.response.status, "error response status");
          if (error.response.status == 400) {
            setError(true);
            setErrorMessage("Course already present!");
          } else if (error.response.status == 422) {
            setError(true);
            setErrorMessage("Please enter again with appropriate data!");
          }
        });

      return;
    }

    addCourseApi(course, token)
      .then((response) => {
        if (response.status == 201) {
          setOperation("added");
          setCourseName(values.courseName);
          dispatch(setPopup(true));
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        console.log(error.response.status, "error response status");
        if (error.response.status == 409) {
          setError(true);
          setErrorMessage("Course already present!");
        } else if (error.response.status == 422) {
          setError(true);
          setErrorMessage("Please enter again with appropriate data!");
        }
      });
  }

  function validate(values) {
    setError(false);

    let errors = {};

    if (
      values.courseName == undefined ||
      values.courseName.length < 5 ||
      values.courseName.length > 20
    ) {
      errors.courseName = "Enter 5 to 20 characters";
      setStyle({ marginTop: "10px" });
    }

    if (
      values.courseDescription == undefined ||
      values.courseDescription.length < 10 ||
      values.courseDescription.length > 30
    ) {
      errors.courseDescription =
        "Description should be b/w 10 to 30 characters";
      setStyle({ marginTop: "10px" });
    }

    if (values.creditHours == null || values.creditHours < 0.5) {
      errors.creditHours =
        "The course should have a minimum duration of 0.5 hrs";
      setStyle({ marginTop: "10px" });
    }

    return errors;
  }

  return (
    <div>
      <div
        style={{ filter: popup ? "blur(5px)" : "none" }}
        className="course-form"
      >
        <Formik
          initialValues={{
            courseId: props.course.courseId,
            courseName: props.course.courseName,
            courseDescription: props.course.courseDescription,
            creditHours: props.course.creditHours,
          }}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          <Form>
            <fieldset>
              <label htmlFor="courseName">Course Name:</label>
              <Field
                type="text"
                name="courseName"
                placeholder="Enter Course name..."
                disabled={props.course.courseId === undefined ? false : true}
              />
              <ErrorMessage
                name="courseName"
                render={(errorMessage) => (
                  <div className="error-message">{errorMessage}</div>
                )}
              />
            </fieldset>

            <fieldset>
              <label htmlFor="courseDescription">Course Description:</label>
              <Field
                type="text"
                name="courseDescription"
                placeholder="Provide Course description..."
              />
              <ErrorMessage
                name="courseDescription"
                render={(errorMessage) => (
                  <div className="error-message">{errorMessage}</div>
                )}
              />
            </fieldset>

            <fieldset>
              <label htmlFor="creditHours">Credit Hours:</label>
              <Field
                type="number"
                name="creditHours"
                placeholder="Provide Credit hours..."
              />
              <ErrorMessage
                name="creditHours"
                render={(errorMessage) => (
                  <div className="error-message">{errorMessage}</div>
                )}
              />
            </fieldset>

            <input
              disabled={popup}
              style={style}
              className="course-submit"
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
        heading={`Course ${operation} !`}
        message={`Successfully ${operation} Course ${courseName} !`}
        closePopup={closePopup}
      />
    </div>
  );
}
