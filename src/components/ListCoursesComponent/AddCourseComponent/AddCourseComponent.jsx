import "./AddCourseComponent.css";
import CourseFormComponent from "../CourseFormComponent/CourseFormComponent";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { retrieveCourseApi } from "../../../api/CourseApiService";
import Cookies from "js-cookie";

export default function AddCourseComponent() {

  const { id } = useParams();

  const [course, setCourse] = useState({});

  const popup = useSelector((state) => state.popup.value);

  const token = Cookies.get("authorizationToken");

  useEffect(() => {
    async function fetchCourse() {
      if (id !== undefined) {
        const response = await retrieveCourseApi(id, token);
        setCourse(response.data);
      }
    }
    fetchCourse();
  }, []);

  return (
    <div>
      <div
        style={{ filter: popup ? "blur(5px)" : "none" }}
        className="add-course-component"
      >
        <h2>Enter Course Data</h2>
      </div>

      <CourseFormComponent course={course} />
    </div>
  );
}
