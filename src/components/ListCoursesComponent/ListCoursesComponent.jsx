import "./ListCoursesComponent.css";
import { useEffect, useState } from "react";
import { retrieveAllCoursesApi } from "../../api/CourseApiService";
import CourseComponent from "./CourseComponent/CourseComponent";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function ListCoursesComponent(){

    const [courseArray, setCourseArray] = useState([]);

    const [isError, setError] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => refreshCourses(), []);

    const token = Cookies.get('authorizationToken');

    function refreshCourses(){
        retrieveAllCoursesApi(token)
        .then(response => {
            setCourseArray(response.data)
            console.log(courseArray);
        })
        .catch(error => console.log(error))
    }

    return(
        <div className="list-courses">
            <div className="courseData">
            {courseArray.map((course) => {
                return <CourseComponent 
                key={course.courseId} 
                courseId={course.courseId} 
                courseName={course.courseName} 
                courseDescription={course.courseDescription} 
                creditHours={course.creditHours} 
                refreshCourses={refreshCourses}
                setError={setError}
                setErrorMessage={setErrorMessage}
                />
                })}
            </div>
            {isError && <p className="error-message">{errorMessage}</p>}
            <button className="addCourseButton">
                <Link to="/add-course">Add Course</Link>
            </button>
        </div>
        
    )
}