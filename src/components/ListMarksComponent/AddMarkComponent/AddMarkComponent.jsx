import "./AddMarkComponent.css";
import MarkFormComponent from "../MarkFormComponent/MarkFormComponent";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { retrieveMarkApi } from "../../../api/MarkApiService";

export default function AddMarkComponent() {

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
    <div className="add-mark-component">
      <h2>Enter Mark Data</h2>
      <MarkFormComponent />
    </div>
  );
}
