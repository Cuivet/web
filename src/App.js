import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./config/routes";
import { EditProvider } from "../src/context/ClinicalRecordContext/ClinicalRecordContext";
import { VetProvider } from "./context/MenuTopContext/MenuTopContext";
// import { DatePicker, Card } from 'antd';
//import{BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  // const test  = (date, dateString) =>{
  //   console.log(date, dateString)
  // }
  return (
    <Router>
        <VetProvider>
          <EditProvider>
            <Routes>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <route.layout>
                      <route.component />
                    </route.layout>
                  }
                />
              ))}
            </Routes>
          </EditProvider>
        </VetProvider>
    </Router>
  );
}
/*
function RouterWithSubRoutes(route){
  console.log(route);
  return (
    <Routes>
      {route.routes.map((item, index) =>(
        <Route 
          key={index}
          path={item.path}
          element={<route.component routes={route.routes} />}
          />
      ))}
    </Routes>     
  );
}
*/
// function Home(){
//   return <h2>Estamos en el componente home</h2>;
// }

// function Contact(){
//   return <h2>Componente Contact</h2>;
// }
// function Users(){
//   return <h2>Componente Users</h2>;
// }
// function Error404(){
//   return <h2> Error 404 ...</h2>;

// }

export default App;
