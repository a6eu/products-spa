import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, Spin } from "antd";
import axios from "axios";
import { config } from "../config.ts";
import {EditOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import { RootState } from '../lib/store';
import { htmlToText } from 'html-to-text';

interface DataType {
    image: string;
    _id: string;
    name: string;
    price: number;
    status: string;
    description: string;
}

const ProductsTable: React.FC = () => {
    const [products, setProducts] = useState<DataType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const search = useSelector((state: RootState) => state.search);

    const fetchProducts = () => {
        setLoading(true);
        axios
            .get(`${config.apiUrl}/api/products`, {
                params: { search }
            })
            .then((response) => setProducts(response.data))
            .catch((error) => console.error("Error fetching products:", error))
            .finally(() => setLoading(false));
    };

    const handleDeleteProduct = (id: string) => {
        setLoading(true);
        axios
            .delete(`${config.apiUrl}/api/products/${id}`)
            .then(() => {
                console.log("Product deleted successfully");
                fetchProducts();
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchProducts();
    }, [search]);

    const columns = [
        {
          title: "Image",
          dataIndex: "images",
          key: "images",
          render: (image: string) => <img src={image} alt="Фото"/>
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text: string) => <h1>{text}</h1>,
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (text: number) => <h1>{text}</h1>,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (text: number) => <h1>{text}</h1>,
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (text: string) => <h1>{htmlToText(text)}</h1>,
        },
        {
            title: "Action",
            key: "action",
            render: (record: DataType) => (
                <div className={`flex gap-2 items-center w-16`}>
                    <Popconfirm
                        title="Are you sure you want to delete this product?"
                        onConfirm={() => handleDeleteProduct(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type={'link'} danger>Delete</Button>
                    </Popconfirm>

                    <a className={`flex gap-1`} href={'/products/edit/' + record._id}>
                        <EditOutlined />
                        Редактировать
                    </a>
                </div>
            ),
        },
    ];

    return (
        <div className="h-auto max-w-screen-2xl w-full">
            {loading ? (
                <div className={`w-full h-1/2 flex justify-center items-center`}>
                    <Spin size="large" />
                </div>
            ) : (
                <Table
                    className="w-full"
                    dataSource={products.map((product) => ({
                        ...product,
                        key: product._id,
                    }))}
                    columns={columns}
                    pagination={{
                        current: 1,
                        pageSize: 5,
                    }}
                />
            )}
        </div>
    );
};

export default ProductsTable;
