import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Products from '../admin/container/Products/Products';





function AdminRoutes(props) {
    return (
        <div>
            <Routes>
                <Route exact path='/products' element={<Products />} />
            </Routes>
        </div>
    );
}

export default AdminRoutes;