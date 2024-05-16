import "./App.css";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import FooterComponent from "./components/FooterComponent/FooterComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import ErrorComponent from "./components/ErrorComponent/ErrorComponent";
import WelcomeComponent from "./components/WelcomeComponent/WelcomeComponent";
import ListStudentsComponent from "./components/ListStudentsComponent/ListStudentsComponent";
import AddStudentComponent from "./components/ListStudentsComponent/AddStudentComponent/AddStudentComponent";
import LogoutComponent from "./components/LogoutComponent/LogoutComponent";
import ListCoursesComponent from "./components/ListCoursesComponent/ListCoursesComponent";
import AddCourseComponent from "./components/ListCoursesComponent/AddCourseComponent/AddCourseComponent";
import ListRegistrationsComponent from "./components/ListRegistrationsComponent/ListRegistrationsComponent";
import AddRegistrationComponent from "./components/ListRegistrationsComponent/AddRegistrationComponent/AddRegistrationComponent";
import ListMarksComponent from "./components/ListMarksComponent/ListMarksComponent";
import AddMarkComponent from "./components/ListMarksComponent/AddMarkComponent/AddMarkComponent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HeaderComponent />
        <Routes>

          <Route path="/" element={<LoginComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="*" element={<ErrorComponent />} />
          <Route path="/welcome" element={<WelcomeComponent />} />

          <Route path="/students" element={<ListStudentsComponent />} />
          <Route path="/add-student" element={<AddStudentComponent />} />
          <Route path="/update-student/:id" element={<AddStudentComponent />} />
          
          <Route path="/courses" element={<ListCoursesComponent />} />
          <Route path="/add-course" element={<AddCourseComponent />} />
          <Route path="/update-course/:id" element={<AddCourseComponent />} />

          <Route path="/registrations" element={<ListRegistrationsComponent />} />
          <Route path="/add-registration" element={<AddRegistrationComponent />} />
          {/* <Route path="/update-course/:id" element={<AddCourseComponent />} /> */}

          <Route path="/marks" element={<ListMarksComponent />} />
          <Route path="/add-mark" element={<AddMarkComponent />} />

          <Route path="/logout" element={<LogoutComponent />} />

        </Routes>
        {/* <FooterComponent /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
