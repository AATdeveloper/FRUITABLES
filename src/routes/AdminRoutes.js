import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Products from '../admin/container/Products/Products';
import Layout from '../admin/component/layout/Layout';
import Review from '../admin/container/Products/Review/Review';
import Category from '../admin/container/Category/Category';







function AdminRoutes(props) {
    return (
        <Layout>
            <Routes>
                <Route exact path='/products' element={<Products />} />
                <Route exact path='/reviews' element={<Review/>}/>
                <Route exact path='/Category' element={<Category/>}/>
              
            </Routes>
        </Layout>
    );
}

export default AdminRoutes;