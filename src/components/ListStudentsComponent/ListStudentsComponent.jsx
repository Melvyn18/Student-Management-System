import "./ListStudentsComponent.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setPopup } from "../../slices/popupSlice";
import { useEffect, useState } from "react";
import { retrieveAllStudentsApi } from "../../api/StudentApiService";
import StudentComponent from "./StudentComponent/StudentComponent";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import PopupComponent from "../PopupComponent/PopupComponent";

export default function ListStudentsComponent() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [studentArray, setStudentArray] = useState([]);

  const [isError, setError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");  

  const popup = useSelector((state) => state.popup.value);

  const deletedStudent = useSelector((state) => state.deletedStudent.value);

  const token = Cookies.get("authorizationToken");

  useEffect(() => refreshStudents(), []);

  function refreshStudents() {
    retrieveAllStudentsApi(token)
      .then((response) => {
        setStudentArray(response.data);
      })
      .catch((error) => console.log(error, "error-refreshStudents"));
  }

  function closePopup() {
    dispatch(setPopup(false));
  }

  function navigateToAddStudent() {
    navigate(`/add-student`);
  }

  return (
    <div>
      <div
        style={{ filter: popup ? "blur(5px)" : "none" }}
        className="list-students"
      >
        <div className="studentData">
          {studentArray.map((student) => {
            return (
              <StudentComponent
                key={student.studentId}
                studentId={student.studentId}
                name={student.name}
                birthDate={student.birthDate}
                emailId={student.emailId}
                address={student.address}
                refreshStudents={refreshStudents}
                setError={setError}
                setErrorMessage={setErrorMessage}
              />
            );
          })}
        </div>
        
        {isError && <p className="error-message">{errorMessage}</p>}

        <button
          disabled={popup}
          className="addStudentButton"
          onClick={navigateToAddStudent}
        >
          Add Student
        </button>
      </div>

      <PopupComponent
        trigger={popup}
        heading={`Deleted Student !`}
        message={`Successfully deleted Student - ${deletedStudent}`}
        closePopup={closePopup}
      />
    </div>
  );
}
