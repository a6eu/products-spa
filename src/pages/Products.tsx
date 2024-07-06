import React from "react";
import ProductsTable from "../components/ProductsTable.tsx";

const Products: React.FC = () => {
    return (
        <div className={'bg-white w-full flex justify-center'}>
            <ProductsTable />
        </div>
    );
}

export default Products;