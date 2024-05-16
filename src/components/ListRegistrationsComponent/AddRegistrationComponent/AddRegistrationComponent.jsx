import "./AddRegistrationComponent.css";
import RegistrationFormComponent from "../RegistrationFormComponent/RegistrationFormComponent";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { retrieveRegistrationApi } from "../../../api/RegistrationApiService";

export default function AddRegistrationComponent() {

  // const {id} = useParams();

  // const [registration, setRegistration] = useState({});

  // useEffect(() => {
  //   async function fetchRegistration(){
  //     console.log(id);
  //     if(id !== undefined){
  //       const response = await retrieveRegistrationApi(id);
  //     // console.log(response);
  //     setRegistration(response.data);
  //     // console.log(student);
  //     }
      
  //   };
  //   fetchRegistration()
    
  // }, []);

  

  return (
    <div className="add-registration-component">
      <h2>Enter Registration Data</h2>
      <RegistrationFormComponent/>
    </div>
  );
}
