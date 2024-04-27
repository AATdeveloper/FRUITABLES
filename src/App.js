import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import { Provider } from "react-redux";
import { configStore } from "./admin/component/redux/store";
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from "./contex/ThemeContext";


function App() {
  const { store, persistor } = configStore();
  return (
    <>
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route exact path="/*" element={<UserRoutes />} />

            <Route element={<PrivateRoutes />} />
            <Route exact path="/admin/*" element={<AdminRoutes />} />


          </Routes>
        </PersistGate>
      </Provider>
      </ThemeProvider>

    </>

  );
}

export default App;
