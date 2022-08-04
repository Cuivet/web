//Layout
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic/LayoutBasic";
import LayoutLanding from "../layouts/LayoutLanding/LayoutLanding";
// import LayoutTest from "../layouts/LayoutTest";


//Admin pages
import AdminHome from "../pages/Admin";
 
//Cuivet pages
import LogIn from "../pages/LogIn/LogIn";
import Menu from "../pages/MenuWeb/MenuWeb";
import Settings from "../pages/Settings/Settings";
import UserSettings from "../pages/Settings/UserSettings";
import RegisterPet from "../pages/RegisterPet/RegisterPet"

//Client pages
import Landing from "../pages/Landing";
import Contact from "../pages/Contact";

const routesAdmin = [
    
    {
        path:"/admin",
        component: AdminHome,
        layout: LayoutAdmin,
    },
    {
        path: "/login",
        component: LogIn,
        layout: LayoutBasic,
    },
    {
        path: "/menu",
        component: Menu,
        layout: LayoutAdmin,
    },
    {
        path: "/settings",
        component: Settings,
        layout: LayoutAdmin,

    },
    {
        path: "/settings/user",
        component: UserSettings,
        layout: LayoutAdmin,

    },
    {
        path: "/register-pet",
        component: RegisterPet,
        layout: LayoutAdmin,
    }
];

const routesClient = [    
    {
        path:"/",
        component:Landing,
        layout: LayoutLanding,
        
    },
    {
        path:"/contact",
        layout: LayoutBasic,
        component:Contact,
    }
];

const routes = [...routesAdmin, ...routesClient];

export default routes;