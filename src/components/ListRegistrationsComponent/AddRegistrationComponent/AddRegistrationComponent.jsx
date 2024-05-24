import "./AddRegistrationComponent.css";
import RegistrationFormComponent from "../RegistrationFormComponent/RegistrationFormComponent";
import { useSelector } from "react-redux";

export default function AddRegistrationComponent() {

  const popup = useSelector((state) => state.popup.value);

  return (
    <div>
      <div
        style={{ filter: popup ? "blur(5px)" : "none" }}
        className="add-registration-component"
      >
        <h2>Enter Registration Data</h2>
      </div>
      
      <RegistrationFormComponent />
    </div>
  );
}
