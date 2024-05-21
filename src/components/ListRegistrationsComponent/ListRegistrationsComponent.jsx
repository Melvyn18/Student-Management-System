import "./ListRegistrationsComponent.css";
import { useEffect, useState } from "react";
import { retrieveAllRegistrationsApi } from "../../api/RegistrationApiService";
import { Link } from "react-router-dom";
import RegistrationComponent from "./RegistrationComponent/RegistrationComponent";
import Cookies from "js-cookie";

export default function ListRegistrationsComponent(){

    const [registrationArray, setRegistrationArray] = useState([]);

    const [isError, setError] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => refreshRegistrations(), []);

    const token = Cookies.get('authorizationToken');

    function refreshRegistrations(){
        retrieveAllRegistrationsApi(token)
        .then(response => {
            setRegistrationArray(response.data)
        })
        .catch(error => console.log(error))
    }

    return(
        <div className="list-registrations">
            <div className="registrationData">
            {registrationArray.map((registration) => {
                return <RegistrationComponent 
                key={registration.registrationId} 
                registrationId={registration.registrationId} 
                registrationDate={registration.registrationDate} 
                student={registration.student} 
                course={registration.course} 
                refreshRegistrations={refreshRegistrations}
                setError={setError}
                setErrorMessage={setErrorMessage}
                />
                })}
            </div>
            {isError && <p className="error-message">{errorMessage}</p>}
            <button className="addRegistrationButton">
                <Link to="/add-registration">Add Registration</Link>
            </button>
        </div>
        
    )
}