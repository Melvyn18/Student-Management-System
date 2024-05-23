import "./AddMarkComponent.css";
import MarkFormComponent from "../MarkFormComponent/MarkFormComponent";
import { useSelector } from "react-redux";

export default function AddMarkComponent() {
  let popup = useSelector((state) => state.popup.value);

  return (
    <div>
      <div
        style={{ filter: popup ? "blur(5px)" : "none" }}
        className="add-mark-component"
      >
        <h2>Enter Mark Data</h2>
      </div>
      <MarkFormComponent />
    </div>
  );
}
