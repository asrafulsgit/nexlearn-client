
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