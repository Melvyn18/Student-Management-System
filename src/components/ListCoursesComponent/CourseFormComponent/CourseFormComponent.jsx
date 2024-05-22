import { useState } from "react";
import "./CourseFormComponent.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addCourseApi } from "../../../api/CourseApiService";
import { updateCourseApi } from "../../../api/CourseApiService";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function CourseFormComponent(props) {

    const navigate = useNavigate();

    const [isError, setError] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const token = Cookies.get('authorizationToken');

  const [style, setStyle] = useState({
    marginTop: "20px",
  });

  function onSubmit(values) {
    console.log(values);
    const course = {
      courseId: props.course.courseId,
      courseName: values.courseName,
      courseDescription: values.courseDescription,
      creditHours: values.creditHours,
    };

    

    if(values.courseId !== undefined){
      console.log(values.courseId);
      // setError(false);

      updateCourseApi(course, token)
      .then(response => {
        console.log(response)
        navigate('/courses');
      })
      .catch(error => {
        console.log(error.response.status)
        if(error.response.status == 400){
          setError(true);
          setErrorMessage("Course already present!");
        }
        else if(error.response.status == 422){
          setError(true);
          setErrorMessage("Please enter again with appropriate data!");
        }
      })

      return;
    }

    console.log("Undefined");

    addCourseApi(course, token)
      .then((response) => {
        console.log(response.status)
        if(response.status == 201){
            navigate('/courses');
        }
        else{
            setError(true);
        }
        })
      .catch((error) => {
        console.log(error.response.status)
        if(error.response.status == 409){
          setError(true);
          setErrorMessage("Course already present!");
        }
        else if(error.response.status == 422){
          setError(true);
          setErrorMessage("Please enter again with appropriate data!");
        }
      });
  }

  function validate(values) {
    setError(false);
    // let date = new Date();
    // date.setFullYear(date.getFullYear() - 10);

    let errors = {};

    if (values.courseName == undefined || values.courseName.length < 5 || values.courseName.length > 20) {
      errors.courseName = "Enter 5 to 20 characters";
      setStyle({ marginTop: "10px" });
    }

    if (values.courseDescription == undefined || values.courseDescription.length < 10 || values.courseDescription.length > 30
    ) {
      errors.courseDescription = "Description should be b/w 10 to 30 characters";
      setStyle({ marginTop: "10px" });
    }

    if (values.creditHours == null || values.creditHours < 0.5) {
      errors.creditHours = "The course should have a minimum duration of 0.5 hrs";
      setStyle({ marginTop: "10px" });
    }

    return errors;
  }

  return (
    <div className="course-form">
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
            <Field type="text" name="courseName" placeholder="Enter Course name..."  disabled={ props.course.courseId === undefined ? false : true }/>
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
            style={style}
            className="course-submit"
            type="submit"
            value="Submit"
          />
          {isError && <p className="error-message error-paragraph">{errorMessage}</p>}
        </Form>
      </Formik>
    </div>
  );
}
