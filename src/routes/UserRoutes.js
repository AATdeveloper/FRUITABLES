import React, { useContext } from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import Header from '../users/component/header/Header';
import Home from '../users/container/home/Home';
import Footer from '../users/component/footer/Footer';
import Shop from '../users/container/Shop/Shop';
import Shop_Detail from '../users/container/Shop_Detail/Shop_Detail';
import Cart from '../users/container/Cart/Cart';
// import Chackout from '../users/container/Chackout/Chackout';
import Testimonial from '../users/container/testimonial/Testimonial';
import Error from '../users/container/404Error/Error';
import PrivateRoutes from './PrivateRoutes';
import { ThemeContext } from '../contex/ThemeContext';
import Contact from '../users/container/contact/Contact';

function UserRoutes(props) {
    const theme = useContext(ThemeContext);
    console.log(theme);
    return (
        <div className={theme.theme}>
            <Header />

            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/Shop" element={<Shop />} />
                <Route exact path="/Shop_Detail" element={<Shop_Detail />} />
                <Route exact path="/Shop/:id" element={<Shop_Detail />} />
                <Route exact path="/Cart" element={<Cart />} />

                <Route element= {<PrivateRoutes/>}> 
                {/* <Route exact path="/Chackout" element={<Chackout />} /> */}
                </Route>
             
                <Route exact path="/Testimonial" element={<Testimonial />} />
          
                <Route exact path="/Error" element={<Error />} />
                <Route exact path="/contact" element={<Contact />} />

            </Routes>

            <Footer />
        </div>
    );
}

export default UserRoutes;
