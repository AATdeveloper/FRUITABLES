import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";


function App() {
  return (
    <>
   
   <Routes>
    <Route exact path="/*" element={<UserRoutes/>}/>

    <Route element = {<PrivateRoutes/>} />
    <Route exact path="/admin/*" element={<AdminRoutes/>}/>

   
   </Routes>


    </>

  );
}

export default App;
