import CreateProductForm from "../components/CreateProductForm.tsx";
import ComponentTitle from "../components/ComponentTitle.tsx";

const CreateProduct = () => {
    return (
        <>
            <div className={`flex justify-center flex-col items-center`}>
                <ComponentTitle title={"Добавить товар"} />
                <CreateProductForm/>
            </div>
        </>
    );
};

export default CreateProduct;
