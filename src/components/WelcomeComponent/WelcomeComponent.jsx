import "./WelcomeComponent.css";
import { retrieveAllCoursesApi } from "../../api/CourseApiService";
import { retrieveAllStudentsApi } from "../../api/StudentApiService";
import { retrieveAllRegistrationsApi } from "../../api/RegistrationApiService";
import { retrieveAllMarksApi } from "../../api/MarkApiService";
import { useState, useEffect } from "react";
import DashComponent from "./DashComponent/DashComponent";
import Cookies from "js-cookie";
// import { useSelector } from "react-redux";

export default function WelcomeComponent(){

    const [courses, setCourses] = useState([]);

    const [students, setStudents] = useState([]);

    const [registrations, setRegistrations] = useState([]);
  
    const [marks, setMarks] = useState([]);

    // let username = useSelector(state => state.username.value);
    useEffect(() => refreshData(), []);

    const token = Cookies.get('authorizationToken');

    function refreshData() {
        retrieveAllCoursesApi(token)
          .then((response) => {
            setCourses(response.data);
          })
          .catch((error) => console.log(error));
    
        retrieveAllStudentsApi(token)
          .then((response) => {
            setStudents(response.data);
          })
          .catch((error) => console.log(error));

          retrieveAllRegistrationsApi(token)
          .then((response) => {
            setRegistrations(response.data);
          })
          .catch((error) => console.log(error));
    
        retrieveAllMarksApi(token)
          .then((response) => {
            setMarks(response.data);
          })
          .catch((error) => console.log(error));


      }

    return(
        <div className="dash-container">
            <DashComponent count={courses.length} message={"Courses Available"}/>
            <DashComponent count={students.length} message={"Student Present"}/>
            <DashComponent count={registrations.length} message={"Registered Course Records"}/>
            <DashComponent count={marks.length} message={"Uploaded Mark Records"}/>
        </div>
    )
}