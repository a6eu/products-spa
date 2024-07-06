import React from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Products from "./pages/Products.tsx";
import Header from './components/Header.tsx';
import CreateProduct from "./pages/CreateProduct.tsx";
import EditProduct from "./pages/EditProduct.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <>
                <Header/>
                <Routes>
                    <Route path="/" element={<Products />}/>
                    <Route path="/products/edit/:id" element={<EditProduct />}/>
                    <Route path="/products/create" element={<CreateProduct />}/>
                </Routes>
            </>
        </Router>
    );
};

export default App;