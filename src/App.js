
import Header from './users/component/header/Header';
import Home from './users/container/home/Home';
import Footer from './users/component/footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Shop from './users/container/Shop/Shop';
import Shop_Detail from './users/container/Shop_Detail/Shop_Detail';
import Cart from './users/container/Cart/Cart';
import Chackout from './users/container/chackout/Chackout';
import Testimonial from './users/container/testimonial/Testimonial';
import Error from './users/container/404Error/Error';
import Contact from './users/container/contact/Contact';

function App() {
  return (
    <>
      <Header />

      <Routes> 
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Shop" element={<Shop />} />
        <Route exact path="/Shop_Detail" element={<Shop_Detail />} />
        <Route exact path="/Cart" element={<Cart />} />
        <Route exact path="/Chackout" element={<Chackout />} />
        <Route exact path="/Testimonial" element={<Testimonial/>} />
        <Route exact path="/Error" element={<Error/>} />
        <Route exact path="/Contact" element={<Contact/>} />
        

      </Routes>

      <Footer />


    </>

  );
}

export default App;
