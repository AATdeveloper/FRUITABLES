import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Products from '../admin/container/Products/Products';
import Layout from '../admin/component/layout/Layout';
import Review from '../admin/container/Products/Review/Review';






function AdminRoutes(props) {
    return (
        <Layout>
            <Routes>
                <Route exact path='/products' element={<Products />} />
                <Route exact path='/reviews' element={<Review/>}/>
              
            </Routes>
        </Layout>
    );
}

export default AdminRoutes;