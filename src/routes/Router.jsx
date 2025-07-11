
import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import StudySessions from "../components/users/studySessions/StudySessions";
import Tutors from "../components/users/tutors/Tutors";
import AboutUs from "../components/users/aboutUs/AboutUs";
import Contact from "../components/users/contact/Contact";
import FAQ from "../components/users/faq/FAQ";
import SessionDetails from "../components/users/studySessions/SessionDetails";
import Login from "../components/authenticator/login/Login";
import Register from "../components/authenticator/register/Register";
import BookedSessions from "../components/student/BookedSessions";
import CreateNote from "../components/student/CreateNote";
import ManageNotes from "../components/student/ManageNotes";
import StudyMaterials from "../components/student/StudyMaterials";
import CreateSession from "../components/tutor/CreateSession";
import MySessions from "../components/tutor/MySessions";
import UploadMaterials from "../components/tutor/UploadMaterials";
import ManageUsers from "../components/admin/ManageUsers";
import ManageSessions from "../components/admin/ManageSessions";
import MyMatetials from "../components/tutor/MyMatetials";
import ManageMaterials from "../components/admin/ManageMaterials";
import ManageTutors from "../components/admin/ManageTutors";



const Router = createBrowserRouter([
    {
        path : '/',
        Component : App,
        children :[
            { 
               index : true,
               Component : Home ,
            },
            { 
                path : 'study-sessions',
                Component : StudySessions 
            },
            { 
                path : 'session/:id',
                Component : SessionDetails 
            },
            { 
                path : 'tutors',
                Component : Tutors 
            },
            { 
                path : 'login', 
                element : <Login /> 
            },
            { 
                path : 'register', 
                element : <Register />  
            },
            { 
                path : 'about-us', 
                Component : AboutUs  
            },
            { 
                path : 'contact', 
                Component : Contact  
            },
            { 
                path : 'faqs', 
                Component : FAQ  
            },  
            {                       // student auth pages
                path : 'booked-sessions', 
                Component : BookedSessions  
            },
            {                        
                path : 'create-note', 
                Component : CreateNote  
            },
            {                        
                path : 'manage-notes', 
                Component : ManageNotes  
            },
            {                        
                path : 'study-materials', 
                Component : StudyMaterials 
            },                              // tutor auth pages
            {                        
                path : 'create-session', 
                Component : CreateSession 
            },
            {                        
                path : 'my-sessions', 
                Component : MySessions 
            },
            {                        
                path : 'upload-materials', 
                Component : UploadMaterials 
            },
            {                        
                path : 'materials', 
                Component : MyMatetials 
            },
            {                           // admin auth pages                    
                path : 'manage-users', 
                Component : ManageUsers 
            },
            {                        
                path : 'manage-sessions', 
                Component : ManageSessions 
            },
            {                        
                path : 'manage-materials', 
                Component : ManageMaterials
            },
            {                        
                path : 'manage-tutors', 
                Component : ManageTutors
            },


    //         { 
    //             path : 'forget-password',
    //             element : <UnAuth_middleware><Forget_password />  </UnAuth_middleware> 
    //         }
        ]
    },
    // {
    //     path: '/*',
    //     Component : NotFoundPage
    // }
]) 
export default Router;