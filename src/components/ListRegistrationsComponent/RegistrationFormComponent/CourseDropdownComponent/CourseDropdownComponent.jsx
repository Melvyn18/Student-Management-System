import { Field, ErrorMessage } from "formik";
import "./CourseDropdownComponent.css";

export default function CourseDropdownComponent(props) {
  return (
    <fieldset>
      <label htmlFor="courseId">Course:</label>
      <Field
        className="course-field"
        as="select"
        name="courseId"
        placeholder="Select course..."
      >
        <option value="">Select Course</option>
        {props.courses.map((course) => {
          return (
            <option key={course.courseId} value={course.courseId}>
              {course.courseName} (id: {course.courseId})
            </option>
          );
        })}
      </Field>
      <ErrorMessage
        name="courseId"
        render={(errorMessage) => (
          <div className="error-message">{errorMessage}</div>
        )}
      />
    </fieldset>
  );
}
