import "./LoginComponent.css";
import { useDispatch } from "react-redux";
import { change } from "../../slices/userSlice";
import { setLoginStatus } from "../../slices/loginSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { apiClient } from "../../api/ApiClient";
import { executeBasicAuthenticationService } from "../../api/AuthenticationApiService";
import {  useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

export default function LoginComponent(){

    const [password, setPassword] = useState("");

    const [isError, setError] = useState(false);

    const navigate = useNavigate();

    let username = useSelector(state => state.username.value);

    let isLoggedIn = useSelector(state => state.isLoggedIn.value);

    let dispatch = useDispatch();

    async function handleSubmit(username, password){

        const baToken = 'Basic ' + window.btoa(username + ":" + password);

        try{
            const response = await executeBasicAuthenticationService(baToken);
            if(response.status === 200){
                dispatch(setLoginStatus(true));

                Cookies.set('authorizationToken', baToken, {expires: 1});
                Cookies.set('loggedIn', true, {expires: 1})

                navigate("/welcome");

                // apiClient.interceptors.request.use(
                //     (config) => {
                //         console.log('intercepting and adding a token')
                //         config.headers.Authorization = baToken
                //         return config
                //     }
                // )
            }
        }
        catch{
            setError(true);
        }

        
    }

    return(
        <div className="login">
            <img className="login-image" src="/images/students.jpg" alt="students" />
            <p>Create and manage student data and track their records 📝</p>
                <form className="login-form" onSubmit={(event) => {
                    handleSubmit(username, password);
                    event.preventDefault();
                    }}>
                    <fieldset>
                        <label htmlFor="name">Name:</label>
                        <input onChange={(event) => dispatch(change(event.target.value))} type="text" name="name" placeholder="Enter name..." value={username}/>

                        <label htmlFor="password">Password:</label>
                        <input onChange={event => setPassword(event.target.value)} type="password" name="password" placeholder="Provide password..." value={password}/>
                    </fieldset>              
                    <input className="login-input" type="submit" value="Login" />
                    {isError && <p className="error-message">Incorrect Username or Password</p>}
                </form>
            
        </div>
    )
}