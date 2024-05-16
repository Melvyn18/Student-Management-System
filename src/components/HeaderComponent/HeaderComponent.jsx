import { useState } from "react";
import "./HeaderComponent.css";
import { useSelector } from "react-redux";
import NavbarComponent from "../NavbarComponent/NavbarComponent";
import { Link } from 'react-router-dom';

export default function HeaderComponent(){

    const [profileImage] = useState("images/Windows_10_Default_Profile_Picture.svg.png");

    const myImage = "images/melvyn.jpg";

    let isLoggedIn = useSelector(state => state.isLoggedIn.value);

    let username = useSelector(state => state.username.value);

    return(
            <header className= {isLoggedIn ? "logged-header-component" : "header-component"} >
                <h1>Student Management System</h1>
                {isLoggedIn && <NavbarComponent />}
                <div className= {isLoggedIn ? "logged-profile" : "profile"} >
                    {isLoggedIn && <p>Welcome, {username} </p>}
                    <img className="profileImage" src={isLoggedIn ? myImage : profileImage} alt="profile image" />
                </div>
            
                {isLoggedIn && <p className="logout"><Link to="/logout">Logout</Link></p>}
            </header>           
    )
}