import { useState } from "react";
import "./StudentFormComponent.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setPopup } from "../../../slices/popupSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";
import { addStudentApi } from "../../../api/StudentApiService";
import { updateStudentApi } from "../../../api/StudentApiService";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import PopupComponent from "../../PopupComponent/PopupComponent";

export default function StudentFormComponent(props) {
  
  const navigate = useNavigate();

  const [isError, setError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [studentName, setStudentName] = useState("");

  const [operation, setOperation] = useState("");

  const token = Cookies.get("authorizationToken");

  let popup = useSelector((state) => state.popup.value);

  let dispatch = useDispatch();

  console.log(popup, "popup");

  const [style, setStyle] = useState({
    marginTop: "20px",
  });

  function closePopup() {
    dispatch(setPopup(false));
    navigate("/students");
  }

  function onSubmit(values) {
    const student = {
      studentId: props.student.studentId,
      name: values.name,
      birthDate: values.birthDate,
      emailId: values.emailId,
      address: values.address,
    };

    if (values.studentId !== undefined) {
      console.log(values.studentId);

      updateStudentApi(student, token)
        .then((response) => {
          setOperation("updated");
          setStudentName(values.name);
          dispatch(setPopup(true));
          // navigate('/students');
        })
        .catch((error) => {
          console.log(error.response.status);
          if (error.response.status == 400) {
            setError(true);
            setErrorMessage("Repitition of Email Id is not allowed!");
          } else if (error.response.status == 422) {
            setError(true);
            setErrorMessage("Please enter again with appropriate data!");
          }
        });

      return;
    }

    addStudentApi(student, token)
      .then((response) => {
        if (response.status == 201) {
          setOperation("added");
          setStudentName(values.name);
          dispatch(setPopup(true));
          // navigate('/students');
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status == 409) {
          setError(true);
          setErrorMessage("Repitition of Email Id is not allowed!");
        } else if (error.response.status == 422) {
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

    if (
      values.name === undefined ||
      values.name.length < 5 ||
      values.name.length > 20
    ) {
      errors.name = "Enter 5 to 20 characters";
      setStyle({ marginTop: "10px" });
    }

    if (!moment(values.birthDate).isBefore()) {
      errors.birthDate = "Date should be in the past";
      setStyle({ marginTop: "10px" });
    }

    if (
      values.birthDate == null ||
      values.birthDate == "" ||
      values.birthDate == undefined
    ) {
      errors.birthDate = "Provide a Date";
      setStyle({ marginTop: "10px" });
    }

    if (values.emailId == null || values.emailId == "") {
      errors.emailId = "Provide a valid Email Id";
      setStyle({ marginTop: "10px" });
    }

    if (
      values.address === undefined ||
      values.address.length < 10 ||
      values.address.length > 30
    ) {
      errors.address = "Provide an address within 10 to 30 characters";
      setStyle({ marginTop: "10px" });
    }
    return errors;
  }

  return (
    <div>

      <div
        style={{ filter: popup ? "blur(5px)" : "none" }}
        className="student-form"
      >
        <Formik
          initialValues={{
            studentId: props.student.studentId,
            name: props.student.name,
            birthDate: props.student.birthDate,
            emailId: props.student.emailId,
            address: props.student.address,
          }}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          <Form>
            <fieldset>
              <label htmlFor="name">Name:</label>
              <Field type="text" name="name" placeholder="Enter name..." />
              <ErrorMessage
                name="name"
                render={(errorMessage) => (
                  <div className="error-message">{errorMessage}</div>
                )}
              />
            </fieldset>

            <fieldset>
              <label htmlFor="birthDate">Birth Date:</label>
              <Field
                type="date"
                name="birthDate"
                placeholder="Provide birth date..."
              />
              <ErrorMessage
                name="birthDate"
                render={(errorMessage) => (
                  <div className="error-message">{errorMessage}</div>
                )}
              />
            </fieldset>

            <fieldset>
              <label htmlFor="emailId">Email Id:</label>
              <Field
                type="email"
                name="emailId"
                placeholder="Provide email..."
                disabled={props.student.studentId === undefined ? false : true}
              />
              <ErrorMessage
                name="emailId"
                render={(errorMessage) => (
                  <div className="error-message">{errorMessage}</div>
                )}
              />
            </fieldset>

            <fieldset>
              <label htmlFor="address">Address:</label>
              <Field
                type="text"
                name="address"
                placeholder="Provide address..."
              />
              <ErrorMessage
                name="address"
                render={(errorMessage) => (
                  <div className="error-message">{errorMessage}</div>
                )}
              />
            </fieldset>

            <input
              disabled={popup}
              style={style}
              className="student-submit"
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
        heading={`Student ${operation} !`}
        message={`Successfully ${operation} Student ${studentName} !`}
        closePopup={closePopup}
      />

    </div>
  );
}
