//Layout
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";


//Admin pages
import AdminHome from "../pages/Admin";

//Cuivet
import LogIn from "../pages/LogIn/LogIn";
import Menu from "../pages/MenuWeb/MenuWeb";

//Client pages
import Home from "../pages/Home";
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
    }
];

const routesClient = [
    {
        path:"/",
        layout: LayoutBasic,
        component:Home,
    },
    {
        path:"/contact",
        layout: LayoutBasic,
        component:Contact,
    }
];

const routes = [...routesAdmin, ...routesClient];

export default routes;