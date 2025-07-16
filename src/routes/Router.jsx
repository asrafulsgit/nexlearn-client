
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
import StudentAuth from "../middlewares/StudentAuth";
import TutorAuth from "../middlewares/TutorAuth";
import AdminAuth from "../middlewares/AdminAuth";
import UnAuth from "../middlewares/UnAuth";
import Checkout from "../components/student/payment/Checkout";
import UserAuth from "../middlewares/UserAuth";
import MyStudyMaterials from "../components/student/MyStudyMaterials";
import PrivacyPolicy from "../components/users/others/PrivacyPolicy";
import TermsAndConditions from "../components/users/others/TermsAndConditions";
import Accessibility from "../components/users/others/Accessibility";
import NotFoundPage from "../additionals/NotFoundPage";



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
                element :<UserAuth> <SessionDetails /> </UserAuth>,
                errorElement : <NotFoundPage />  
            },
            { 
                path : 'tutors',
                Component : Tutors 
            },
            { 
                path : 'login', 
                element : <UnAuth> <Login />  </UnAuth> 
            },
            { 
                path : 'register', 
                element : <UnAuth> <Register />  </UnAuth>
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
                element : <StudentAuth> <BookedSessions /> </StudentAuth>   
            },
            {                        
                path : 'create-note', 
                element : <StudentAuth> <CreateNote /> </StudentAuth>  
            },
            {                        
                path : 'manage-notes', 
                element : <StudentAuth> <ManageNotes /> </StudentAuth>  
            },
            {                        
                path : 'study-materials', 
                element : <StudentAuth > <StudyMaterials /> </StudentAuth> 
            },                            
            {                        
                path : 'my-study-materials/:sessionId', 
                element : <StudentAuth > <MyStudyMaterials /> </StudentAuth>,
                errorElement : < NotFoundPage />
            },                            
            {                        
                path : 'checkout/:sessionId', 
                element : <StudentAuth > <Checkout /> </StudentAuth> ,
                errorElement : < NotFoundPage />
            },                              // tutor auth pages
            {                        
                path : 'create-session', 
                element :<TutorAuth> <CreateSession /> </TutorAuth>   
            },
            {                        
                path : 'my-sessions', 
                element : <TutorAuth> <MySessions />  </TutorAuth> 
            },
            {                        
                path : 'upload-materials', 
                element : <TutorAuth> <UploadMaterials /> </TutorAuth> 
            },
            {                        
                path : 'materials', 
                element : <TutorAuth> <MyMatetials /> </TutorAuth>  
            },
            {                           // admin auth pages                    
                path : 'manage-users', 
                element : <AdminAuth> <ManageUsers /> </AdminAuth> 
            },
            {                        
                path : 'manage-sessions', 
                element : <AdminAuth > <ManageSessions /> </AdminAuth> 
            },
            {                        
                path : 'manage-materials', 
                element : <AdminAuth> <ManageMaterials /> </AdminAuth>
            },
            {                        
                path : 'manage-tutors', 
                element : <AdminAuth> <ManageTutors /> </AdminAuth>
            },            // others pages
            {                        
                path : 'privacy-policy', 
                Component :  PrivacyPolicy 
            },
            {                        
                path : 'terms', 
                Component :  TermsAndConditions 
            },
            {                        
                path : 'accessibility', 
                Component :  Accessibility 
            },


    //         { 
    //             path : 'forget-password',
    //             element : <UnAuth_middleware><Forget_password />  </UnAuth_middleware> 
    //         }
        ]
    },
    {
        path: '/*',
        Component : NotFoundPage
    }
]) 
export default Router;