import "./LogoutComponent.css";
import { Link } from "react-router-dom";

export default function LogoutComponent() {
  return (
    <div>
      <img
        className="logout-image"
        src="/images/Graduation_StudentsGroup.jpg"
        alt="graduated students"
      />
      <div className="logout-component">
        <h1>You are logged out!</h1>
        <div>Thank you for using the App 😃</div>
        <p className="login-again">
          <Link to="/login">Login Again</Link>
        </p>
      </div>
    </div>
  );
}
