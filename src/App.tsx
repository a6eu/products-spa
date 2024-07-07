import React from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Products from "./pages/Products.tsx";
import Header from './components/Header.tsx';
import CreateProduct from "./pages/CreateProduct.tsx";
import EditProduct from "./pages/EditProduct.tsx";
import {Provider} from "react-redux";
import store from "./lib/store.ts";

const App: React.FC = () => {
    return (
        <Provider store={store}>
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
        </Provider>
    );
};

export default App;