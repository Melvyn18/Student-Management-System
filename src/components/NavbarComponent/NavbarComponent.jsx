import { useState } from "react";
import "./NavbarComponent.css";
import { Link } from "react-router-dom";

export default function NavbarComponent() {

  const [style, setStyle] = useState({
    student: {},
    course: {},
    courseRegistraion: {},
    mark: {},
  });

  return (
    <div className="dropdown">
      <p className="dropdown-button">
        Select <i className="fa fa-caret-down"></i>
      </p>
      <ul className="dropdown-content navbar">
        <li
          onMouseOver={() => {
            setStyle((prevStyle) => {
              return {
                ...prevStyle,
                student: { borderBottom: "1px solid grey" },
              };
            });
          }}
          onMouseOut={() => {
            setStyle((prevStyle) => {
              return { ...prevStyle, student: { borderBottom: "none" } };
            });
          }}
          style={style.student}
        >
          <Link to="/students">Student</Link>
        </li>
        <li
          onMouseOver={() => {
            setStyle((prevStyle) => {
              return {
                ...prevStyle,
                course: { borderBottom: "1px solid grey" },
              };
            });
          }}
          onMouseOut={() => {
            setStyle((prevStyle) => {
              return { ...prevStyle, course: { borderBottom: "none" } };
            });
          }}
          style={style.course}
        >
          <Link to="/courses">Course</Link>
        </li>
        <li
          onMouseOver={() => {
            setStyle((prevStyle) => {
              return {
                ...prevStyle,
                courseRegistraion: { borderBottom: "1px solid grey" },
              };
            });
          }}
          onMouseOut={() => {
            setStyle((prevStyle) => {
              return {
                ...prevStyle,
                courseRegistraion: { borderBottom: "none" },
              };
            });
          }}
          style={style.courseRegistraion}
        >
          <Link to="/registrations">Course Registration</Link>
        </li>
        <li
          onMouseOver={() => {
            setStyle((prevStyle) => {
              return { ...prevStyle, mark: { borderBottom: "1px solid grey" } };
            });
          }}
          onMouseOut={() => {
            setStyle((prevStyle) => {
              return { ...prevStyle, mark: { borderBottom: "none" } };
            });
          }}
          style={style.mark}
        >
          <Link to="/marks">Mark</Link>
        </li>
      </ul>
    </div>
  );
}
