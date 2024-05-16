import "./LogoutComponent.css";
import { useDispatch } from "react-redux";
import { setLoginStatus } from "../../slices/loginSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function LogoutComponent(){

    let dispatch = useDispatch();

    useEffect(() => {
        function changeLoginStatus(){
            dispatch(setLoginStatus(false));
        }
        changeLoginStatus();
    }, []);

    // dispatch(setLoginStatus(false));

    return(
        <div>
            <img className="logout-image" src="/images/Graduation_StudentsGroup.jpg" alt="graduated students" />
        <div className="logout-component">
            
            <h1>You are logged out!</h1>
            <div>
                Thank you for using the App :)
            </div>
            <p className="login-again"><Link to="/login">Login Again</Link></p>
        </div>
        </div>
        
    )
}