import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <nav className="flex items-center justify-between">
                <div>
                    <a href={'/'} className="text-2xl font-bold">Products</a>
                </div>
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
