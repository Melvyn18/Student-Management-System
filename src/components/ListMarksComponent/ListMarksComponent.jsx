import "./ListMarksComponent.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setPopup } from "../../slices/popupSlice";
import { retrieveAllMarksApi } from "../../api/MarkApiService";
import { useNavigate } from "react-router-dom";
import MarkComponent from "./MarkComponent/MarkComponent";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import PopupComponent from "../PopupComponent/PopupComponent";

export default function ListMarksComponent() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [markArray, setMarkArray] = useState([]);

  const popup = useSelector((state) => state.popup.value);

  const deletedMark = useSelector((state) => state.deletedMark.value);

  const deletedStudent = useSelector((state) => state.deletedStudent.value);

  const deletedCourse = useSelector((state) => state.deletedCourse.value);

  const token = Cookies.get("authorizationToken");

  useEffect(() => refreshMarks(), []);

  function refreshMarks() {
    retrieveAllMarksApi(token)
      .then((response) => {
        setMarkArray(response.data);
      })
      .catch((error) => console.log(error, "error-refreshMarks"));
  }

  function closePopup() {
    dispatch(setPopup(false));
  }

  function navigateToAddMark() {
    navigate(`/add-mark`);
  }

  function navigateToStatistics() {
    navigate(`/statistics`);
  }

  return (
    <div>
      <div
        style={{ filter: popup ? "blur(5px)" : "none" }}
        className="list-marks"
      >
        <div className="markData">
          {markArray.map((mark) => {
            return (
              <MarkComponent
                key={mark.id}
                id={mark.id}
                student={mark.student}
                course={mark.course}
                assessmentType={mark.assessmentType}
                assessmentDate={mark.assessmentDate}
                score={mark.score}
                refreshMarks={refreshMarks}
              />
            );
          })}
        </div>
        <div className="button-div">

          <button
            disabled={popup}
            className="addMarkButton"
            onClick={navigateToAddMark}
          >
            Add Mark
          </button>

          <button
            disabled={popup}
            className="statistics-button"
            onClick={navigateToStatistics}
          >
            Statistics
          </button>
          
        </div>
      </div>

      <PopupComponent
        trigger={popup}
        heading={`Deleted Mark !`}
        message={`Successfully removed Mark[${deletedMark}] of Student[${deletedStudent}] for Course[${deletedCourse}]`}
        closePopup={closePopup}
      />
    </div>
  );
}
