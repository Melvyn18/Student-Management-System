import "./ListMarksComponent.css";
import { retrieveAllMarksApi } from "../../api/MarkApiService";
import { Link } from "react-router-dom";
import MarkComponent from "./MarkComponent/MarkComponent";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function ListMarksComponent(){

    const [markArray, setMarkArray] = useState([]);

    useEffect(() => refreshMarks(), []);

    const token = Cookies.get('authorizationToken');

    function refreshMarks(){
        retrieveAllMarksApi(token)
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
                />
                })}
            </div>
            <div className="button-div">
                
            <button className="addMarkButton">
                <Link to="/add-mark">Add Mark</Link>
            </button>
            <button className="statistics-button">
                <Link to="/statistics">Statistics</Link>
            </button>
            </div>
            
        </div>
        
    )
}