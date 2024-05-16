import "./FooterComponent.css";

export default function FooterComponent(){

    const year = new Date().getFullYear();

    return(
        <footer>
            <p>Created by Melvyn &copy; - {year}</p>
        </footer>
    )
}