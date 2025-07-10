
import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import StudySessions from "../components/studySessions/StudySessions";
import Tutors from "../components/tutors/Tutors";
import AboutUs from "../components/aboutUs/AboutUs";
import Contact from "../components/contact/Contact";
import FAQ from "../components/faq/FAQ";
import SessionDetails from "../components/studySessions/SessionDetails";
import Register from "../components/register/Register";
import Login from "../components/login/Login";


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
            // { 
            //     path : 'event-details/:id',
            //     element : <Auth_middleware><Event_details /></Auth_middleware>,
            //     errorElement : <NotFoundPage />
            // },
            // { 
            //     path : 'manage-events',
            //     element : <Auth_middleware><Manage_events /></Auth_middleware>,
            // },
            // { 
            //     path : 'update-event/:id',
            //     element : <Auth_middleware><Update_event /></Auth_middleware>,
            //     errorElement : <NotFoundPage />
            // },
            // { 
            //     path : 'create-event',
            //     element : <Auth_middleware><Create_event /></Auth_middleware>,
            // },
            // { 
            //     path : 'my-bookings',
            //     element : <Auth_middleware><My_bookings /></Auth_middleware> 
            // },
            // { 
            //     path : 'book-event',
            //     element : <Auth_middleware><Book_event /></Auth_middleware>
            // },
            // { 
            //     path : 'profile',
            //     element : <Auth_middleware><Profile /></Auth_middleware>
            // },
            // { 
            //     path : 'update-profile',
            //     element : <Auth_middleware><Profile_Update /></Auth_middleware>
            // },
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