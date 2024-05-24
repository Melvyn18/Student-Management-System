import { useState } from "react";
import "./HeaderComponent.css";
import NavbarComponent from "../NavbarComponent/NavbarComponent";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function HeaderComponent() {

  const navigate = useNavigate();

  const isLoggedIn = Cookies.get("loggedIn");

  const [profileImage] = useState(
    "images/Windows_10_Default_Profile_Picture.svg.png"
  );

  const myImage = "images/melvyn.jpg";

  const username = Cookies.get("username");

  function logout() {
    navigate("/logout");
    Cookies.remove("loggedIn");
    Cookies.remove("authorizationToken");
    Cookies.remove("username");
  }

  return (
    <header
      className={isLoggedIn ? "logged-header-component" : "header-component"}
    >
      <Link to="/welcome">
        <h1>Student Management System</h1>
      </Link>

      {isLoggedIn && <NavbarComponent />}
      
      <div className={isLoggedIn ? "logged-profile" : "profile"}>
        {isLoggedIn && <p>Welcome, {username} </p>}
        <img
          className="profileImage"
          src={isLoggedIn ? myImage : profileImage}
          alt="profile image"
        />
      </div>

      {isLoggedIn && (
        <button className="logout" onClick={logout}>
          Logout
        </button>
      )}
    </header>
  );
}
