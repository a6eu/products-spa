import { Input } from 'antd';
import React from 'react';
import {setSearch} from "../lib/actions.ts";
import {useDispatch} from "react-redux";

const Header: React.FC = () => {
    const dispatch = useDispatch();

    const handleSearch = (value: string) => {
        dispatch(setSearch(value));
    };

    return (
        <header className="bg-gray-800 text-white p-4 px-44">
            <nav className="flex items-center justify-between">
                <div>
                    <a href={'/'} className="text-2xl font-bold">Products</a>
                </div>
                <Input.Search
                    rootClassName={`w-1/2`}
                    placeholder="Search products"
                    onSearch={handleSearch}
                    enterButton
                />
                <ul className="flex space-x-4">
                    <li>
                        <a href="/products/create" className="hover:text-gray-300">Добавить товар</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
