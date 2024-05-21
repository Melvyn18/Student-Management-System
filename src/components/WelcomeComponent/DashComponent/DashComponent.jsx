import "./DashComponent.css";

export default function DashComponent(props){
    return(
        <div className="dash-component">
            <p className="dash-message">{props.message}</p>
            <p className="dash-count">{props.count}</p>
        </div>
    )
}