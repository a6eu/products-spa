import ComponentTitle from "../components/ComponentTitle.tsx";
import EditProductForm from "../components/EditProductForm.tsx";

const EditProduct = () => {
    return (
        <>
            <div className={`flex justify-center flex-col items-center`}>
                <ComponentTitle title={"Редактировать товар"} />
                <EditProductForm/>
            </div>
        </>
    );
};

export default EditProduct;
