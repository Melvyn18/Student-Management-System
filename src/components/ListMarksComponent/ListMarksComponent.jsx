import "./ListMarksComponent.css";
import { retrieveAllMarksApi } from "../../api/MarkApiService";
import { Link } from "react-router-dom";
import MarkComponent from "./MarkComponent/MarkComponent";
import { useState, useEffect } from "react";

export default function ListMarksComponent(){

    const [markArray, setMarkArray] = useState([]);

    const [isError, setError] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => refreshMarks(), []);

    function refreshMarks(){
        retrieveAllMarksApi()
        .then(response => {
            setMarkArray(response.data)
        })
        .catch(error => console.log(error))
    }

    return(
        <div className="list-marks">
            <div className="markData">
            {markArray.map((mark) => {
                return <MarkComponent 
                key={mark.id} 
                id={mark.id} 
                student={mark.student}
                course={mark.course}
                assessmentType={mark.assessmentType} 
                assessmentDate={mark.assessmentDate} 
                score={mark.score} 
                refreshMarks={refreshMarks}
                setError={setError}
                setErrorMessage={setErrorMessage}
                />
                })}
            </div>
            {isError && <p className="error-message">{errorMessage}</p>}
            <button className="addMarkButton">
                <Link to="/add-mark">Add Mark</Link>
            </button>
        </div>
        
    )
}