import React from "react";


interface Text {
    title: string
}

const ComponentTitle: React.FC<Text> = ({title}) => {
    return (
        <p className={`flex text-2xl font-bold my-2.5`}>{title}</p>
    );
};

export default ComponentTitle;