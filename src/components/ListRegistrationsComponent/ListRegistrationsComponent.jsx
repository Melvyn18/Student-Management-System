import "./ListRegistrationsComponent.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setPopup } from "../../slices/popupSlice";
import { useEffect, useState } from "react";
import { retrieveAllRegistrationsApi } from "../../api/RegistrationApiService";
import { useNavigate } from "react-router-dom";
import RegistrationComponent from "./RegistrationComponent/RegistrationComponent";
import Cookies from "js-cookie";
import PopupComponent from "../PopupComponent/PopupComponent";

export default function ListRegistrationsComponent() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [registrationArray, setRegistrationArray] = useState([]);

  const [isError, setError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const popup = useSelector((state) => state.popup.value);

  const deletedStudent = useSelector((state) => state.deletedStudent.value);

  const deletedCourse = useSelector((state) => state.deletedCourse.value);

  const token = Cookies.get("authorizationToken");

  useEffect(() => refreshRegistrations(), []);

  function refreshRegistrations() {
    retrieveAllRegistrationsApi(token)
      .then((response) => {
        setRegistrationArray(response.data);
      })
      .catch((error) => console.log(error, "error-refreshRegistrations"));
  }

  function closePopup() {
    dispatch(setPopup(false));
  }

  function navigateToAddRegistration() {
    navigate(`/add-registration`);
  }

  return (
    <div>
      <div
        style={{ filter: popup ? "blur(5px)" : "none" }}
        className="list-registrations"
      >
        <div className="registrationData">
          {registrationArray.map((registration) => {
            return (
              <RegistrationComponent
                key={registration.registrationId}
                registrationId={registration.registrationId}
                registrationDate={registration.registrationDate}
                student={registration.student}
                course={registration.course}
                refreshRegistrations={refreshRegistrations}
                setError={setError}
                setErrorMessage={setErrorMessage}
              />
            );
          })}
        </div>
        {isError && <p className="error-message">{errorMessage}</p>}
        <button
          disabled={popup}
          className="addRegistrationButton"
          onClick={navigateToAddRegistration}
        >
          Add Registration
        </button>
      </div>

      <PopupComponent
        trigger={popup}
        heading={`Deleted Registration !`}
        message={`Successfully removed Registration of Student[${deletedStudent}] for Course[${deletedCourse}]`}
        closePopup={closePopup}
      />
    </div>
  );
}
