import { useState } from "react";
import "./HeaderComponent.css";
import { useSelector } from "react-redux";
import NavbarComponent from "../NavbarComponent/NavbarComponent";
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function HeaderComponent(){

    const navigate = useNavigate();

    const isLoggedIn = Cookies.get('loggedIn');

    console.log();

    const [profileImage] = useState("images/Windows_10_Default_Profile_Picture.svg.png");

    const myImage = "images/melvyn.jpg";

    // let isLoggedIn = useSelector(state => state.isLoggedIn.value);

    let username = useSelector(state => state.username.value);

    function logout(){
        navigate('/logout');
        Cookies.remove('loggedIn');
        Cookies.remove('authorizationToken');

    }

    return(
            <header className= {isLoggedIn ? "logged-header-component" : "header-component"} >
                <Link to="/welcome">
                    <h1>Student Management System</h1>
                </Link>
                
                {isLoggedIn && <NavbarComponent />}
                <div className= {isLoggedIn ? "logged-profile" : "profile"} >
                    {isLoggedIn && <p>Welcome, {username} </p>}
                    <img className="profileImage" src={isLoggedIn ? myImage : profileImage} alt="profile image" />
                </div>
            
                {isLoggedIn && <button className="logout" onClick={logout}>Logout</button>}
            </header>           
    )
}