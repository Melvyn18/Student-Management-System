import { Field, ErrorMessage } from "formik";
import "./StudentDropdownComponent.css";

export default function StudentDropdownComponent(props) {
  return (
    <fieldset>
      <label htmlFor="studentId">Student:</label>
      <Field
        className="student-field"
        as="select"
        name="studentId"
        placeholder="Select student..."
      >
        <option value="">Select Student</option>
        {props.students.map((student) => {
          return (
            <option key={student.studentId} value={student.studentId}>
              {student.name} (id: {student.studentId})
            </option>
          );
        })}
      </Field>

      <ErrorMessage
        name="studentId"
        render={(errorMessage) => (
          <div className="error-message">{errorMessage}</div>
        )}
      />
    </fieldset>
  );
}
