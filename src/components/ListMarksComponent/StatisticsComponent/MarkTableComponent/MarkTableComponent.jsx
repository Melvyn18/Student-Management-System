import "./MarkTableComponent.css";

export default function MarkTableComponent(props){
    return(
        <div>
            {props.fieldValue == "Maximum" && !props.isError && !props.isCalculationError && (
        <p className="">
          The maximum marks obtained by the student is {props.maxValue}
        </p>
      )}
      {props.fieldValue == "Average" && !props.isError && !props.isCalculationError && (
        <p className="">
          The average marks obtained by the student is {props.avgValue}
        </p>
      )}

      {!props.isError && !props.isCalculationError && !(props.fieldValue=="") &&
      <table className="marks-table">
        <tr>
          <th>Student Id</th>
          <th>Course Id</th>
          <th>Assessment type</th>
          <th>Assessment date</th>
          <th>Score</th>
        </tr>
        {props.studentFilteredMarks.map((mark) => {
          return (
            <tr key={mark.id}>
              <td>{mark.student.studentId}</td>
              <td>{mark.course.courseId}</td>
              <td>{mark.assessmentType}</td>
              <td>{mark.assessmentDate}</td>
              <td>{mark.score}</td>
            </tr>
          );
        })}
      </table>}
        </div>
    )
}