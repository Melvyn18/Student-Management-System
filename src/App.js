import "./App.css";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
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
import StatisticsComponent from "./components/ListMarksComponent/StatisticsComponent/StatisticsComponent";
import Cookies from "js-cookie";

function AuthenticatedRoute({children}){

  // let isLoggedIn = useSelector(state => state.isLoggedIn.value);

  let isLoggedIn = Cookies.get('loggedIn');

  console.log(isLoggedIn, "Logged");

  if(isLoggedIn){
      return children
  }

  return <Navigate to="/"/>
}

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <HeaderComponent />
        <Routes>

          <Route path="/" element={<LoginComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="*" element={<ErrorComponent />} />
          <Route path="/welcome" element={
            <AuthenticatedRoute>
              <WelcomeComponent />
            </AuthenticatedRoute>
          
          } />

          <Route path="/students" element={
            <AuthenticatedRoute>
              <ListStudentsComponent />
            </AuthenticatedRoute>
          
          } />
          <Route path="/add-student" element={
            <AuthenticatedRoute>
            <AddStudentComponent />
          </AuthenticatedRoute>
          
          } />
          <Route path="/update-student/:id" element={
            <AuthenticatedRoute>
            <AddStudentComponent />
          </AuthenticatedRoute>
          
        } />
          
          <Route path="/courses" element={
            <AuthenticatedRoute>
            <ListCoursesComponent />
          </AuthenticatedRoute>
          
          } />
          <Route path="/add-course" element={
            <AuthenticatedRoute>
            <AddCourseComponent />
          </AuthenticatedRoute>
          
          } />
          <Route path="/update-course/:id" element={
          <AuthenticatedRoute>
          <AddCourseComponent />
        </AuthenticatedRoute>
          } />

          <Route path="/registrations" element={
            <AuthenticatedRoute>
            <ListRegistrationsComponent />
          </AuthenticatedRoute>
          
          } />
          <Route path="/add-registration" element={
            <AuthenticatedRoute>
            <AddRegistrationComponent />
          </AuthenticatedRoute>
          
          } />
          {/* <Route path="/update-course/:id" element={<AddCourseComponent />} /> */}

          <Route path="/marks" element={
            <AuthenticatedRoute>
            <ListMarksComponent />
          </AuthenticatedRoute>
          
          } />
          <Route path="/add-mark" element={
            <AuthenticatedRoute>
            <AddMarkComponent />
          </AuthenticatedRoute>
          
          } />

          <Route path="/logout" element={
            // <AuthenticatedRoute>
            <LogoutComponent />
          // </AuthenticatedRoute>
          
          } />

          <Route path="/statistics" element = {
            <AuthenticatedRoute>
              <StatisticsComponent />
            </AuthenticatedRoute>
          }
          />

        </Routes>
        {/* <FooterComponent /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
