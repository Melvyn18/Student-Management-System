import "./PopupComponent.css";

export default function PopupComponent(props) {
    
  return props.trigger ? (
    <div className="popup">
      <h2>{props.heading}</h2>
      <p>{props.message}</p>
      <button className="close-btn" onClick={props.closePopup}>
        Close
      </button>
    </div>
  ) : (
    ""
  );
}
