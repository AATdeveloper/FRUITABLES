import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Products from '../admin/container/Products/Products';
import Layout from '../admin/component/layout/Layout';
import Review from '../admin/container/Products/Review/Review';
import Category from '../admin/container/Category/Category';
import { configStore } from '../admin/component/redux/store';
import { Provider } from 'react-redux';
import Counter from '../admin/container/Counter';
import Facility from '../admin/container/Facilities/Facility';







function AdminRoutes(props) {
    const store = configStore();
    return (
        <Provider store={store}>
        <Layout>
            <Routes>
                <Route exact path='/products' element={<Products />} />
                <Route exact path='/reviews' element={<Review/>}/>
                <Route exact path='/Category' element={<Category/>}/>
                <Route exact path='/Counter' element={<Counter/>}/>
                <Route exact path='/Facility' element={<Facility/>}/>
              
            </Routes>
        </Layout>
        </Provider>
    );
}

export default AdminRoutes;