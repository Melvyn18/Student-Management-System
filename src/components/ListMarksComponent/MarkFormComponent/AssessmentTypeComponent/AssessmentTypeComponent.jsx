import { Field, ErrorMessage } from "formik";
import "./AssessmentTypeComponent.css";

const assessmentTypes = [
    {id: 1, value: "Mid Term"}, 
    {id: 2, value: "Final"}
];

export default function AssessmentTypeComponent(){

    return (
        <fieldset>
        <label htmlFor="assessmentType">Assessment Type:</label>
        <Field
          className="assessment-type-field"
          as="select"
          name="assessmentType"
          placeholder="Select assessment type..."
        >
          <option value="">Select Assessment Type</option>
          {assessmentTypes.map((assessmentType) => {
            return (
              <option key={assessmentType.id} value={assessmentType.value}>
                {assessmentType.value}
              </option>
            );
          })}
        </Field>

        <ErrorMessage
          name="assessmentType"
          render={(errorMessage) => (
            <div className="error-message">{errorMessage}</div>
          )}
        />
      </fieldset>
    )
}