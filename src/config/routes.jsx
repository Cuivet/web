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
import UserSettings from "../pages/Settings/UserSettings";
import Pets from "../pages/Pets/Pets";
import PetsManagement from "../pages/PetsManagement/PetsManagement";
import ClinicalRecordsManagement from "../pages/ClinicalRecordsManagement/ClinicalRecordsManagement";
import Error404 from "../pages/Error/Error404/Error404";
import VetsAssociations from "../pages/VetsAssociations";
import VeterinariesAssociations from "../pages/VeterinariesAssociations";
import VeterinariesManagement from "../pages/VeterinariesManagement";
import Vets from "../pages/Vets";
import Studies from "../pages/Studies";
import Diary from "../pages/Diary";
import ClinicalRecord from "../pages/ClinicalRecord/ClinicalRecord";
import ClinicalRecordMenu from "../pages/ClinicalRecordMenu/ClinicalRecordMenu";
import StudiesRequest from "../pages/StudiesRequest/StudiesRequest";
import Reports from "../pages/Reports/Reports";
import PetsReports from "../pages/PetsReports/PetsReports";
import Qualification from "../pages/Qualification/Qualification";
import Vaccination from "../pages/Vaccination/Vaccination";
import vetQualification from "../pages/VetQualification/VetQualification";
import ClinicalHistory from "../pages/ClinicalHistory/ClinicalHistory";
import ViewVets from "../pages/ViewVets/ViewVets";
import UsersList from "../pages/Users/UsersList";
import VetsList from "../pages/VetsAdmin/VetsList";

//Client pages
import Landing from "../pages/Landing/Landing";
import Contact from "../pages/Contact";
import path from "path";
import { layouts } from "chart.js";
import ComplementaryStudy from "../components/ComplementaryStudy";

const routesAdmin = [
  {
    path: "/admin",
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
    path: "/settings/user",
    component: UserSettings,
    layout: LayoutAdmin,
  },
  {
    path: "/pets",
    component: Pets,
    layout: LayoutAdmin,
  },
  {
    path: "/pets-management",
    component: PetsManagement,
    layout: LayoutAdmin,
  },
  {
    path: "/clinical-records-management",
    component: ClinicalRecordsManagement,
    layout: LayoutAdmin,
  },
  {
    path: "/vets-associations",
    component: VetsAssociations,
    layout: LayoutAdmin,
  },
  {
    path: "/veterinaries-management",
    component: VeterinariesManagement,
    layout: LayoutAdmin,
  },
  {
    path: "/veterinaries-associations",
    component: VeterinariesAssociations,
    layout: LayoutAdmin,
  },
  {
    path: "/vets",
    component: Vets,
    layout: LayoutAdmin,
  },
  {
    path: "/studies",
    component: Studies,
    layout: LayoutAdmin,
  },
  {
    path: "/calendar",
    component: Diary,
    layout: LayoutAdmin,
  },
  {
    path: "/clinical-record-menu",
    component: ClinicalRecordMenu,
    layout: LayoutAdmin,
  },
  {
    path: "/clinical-record",
    component: ClinicalRecord,
    layout: LayoutAdmin,
  },
  {
    path: "/studies-request",
    component: StudiesRequest,
    layout: LayoutLanding,
  },
  {
    path: "/reports",
    component: Reports,
    layout: LayoutAdmin,
  },
  {
    path: "/pets-reports",
    component: PetsReports,
    layout: LayoutAdmin,
  },
  {
    path: "/vaccination",
    component: Vaccination,
    layout: LayoutAdmin,
  },
  {
    path: "/clinical-history",
    component: ClinicalHistory,
    layout: LayoutAdmin,
  },
  {
    component: Error404,
    layout: LayoutLanding,
    path: "*",
  },
  {
    path: "/qualification",
    component: Qualification,
    layout: LayoutAdmin,
  },
  {
    path: "/vetQualification",
    component: vetQualification,
    layout: LayoutAdmin,
  },
  {
    component: ViewVets,
    layout: LayoutAdmin,
    path: "/vetsMap",
  },
  {
    component: UsersList,
    layout: LayoutAdmin,
    path: "/users",
  },
  {
    component: VetsList,
    layout: LayoutAdmin,
    path: "/vetsList",
  },
  {
    component: ComplementaryStudy,
    layout: LayoutAdmin,
    path: "/publicstudy/:id",
  },
];

const routesClient = [
  {
    path: "/",
    component: Landing,
    layout: LayoutBasic,
  },
  {
    path: "/contact",
    layout: LayoutBasic,
    component: Contact,
  },
  {
    path: "/study/:encodedId",
    layout: LayoutBasic,
    component: ComplementaryStudy,
  },
];

const routes = [...routesAdmin, ...routesClient];

export default routes;
