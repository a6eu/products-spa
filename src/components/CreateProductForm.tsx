import React, { useEffect } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Form as AntForm, Input, Button, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import { config } from "../config.ts";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Option } = Select;

interface FormValues {
    title: string;
    price: number;
    description: string;
    status: string;
    images: File[];
}

const CreateProductForm: React.FC = () => {
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        price: Yup.number().typeError('Price must be a number').required('Price is required'),
        description: Yup.string().required('Description is required'),
        status: Yup.string().required('Status is required'),
        images: Yup.array()
            .of(Yup.mixed().required('Image is required'))
            .min(1, 'At least one image is required'),
    });

    const initialValues: FormValues = {
        title: '',
        price: 0,
        description: '',
        status: '',
        images: [],
    };

    const handleSubmit = async (
        values: FormValues,
        { resetForm }: FormikHelpers<FormValues>
    ) => {
        const formData = new FormData();
        formData.append('name', values.title);
        formData.append('price', values.price.toString());
        formData.append('description', values.description);
        formData.append('status', values.status);
        values.images.forEach((image) => {
            formData.append(`images`, image);
        });

        try {
            const response = await axios.post(`${config.apiUrl}/api/products`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Form submitted with response:', response.data);
            resetForm();
            message.success('Product created successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
            message.error('Failed to create product. Please try again.');
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({
                  values,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  errors,
                  touched,
                  setFieldTouched,
                  isSubmitting,
              }) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                useEffect(() => {
                    if (isSubmitting) {
                        setFieldTouched('description', true);
                    }
                }, [isSubmitting, setFieldTouched]);

                return (
                    <Form className={`w-full max-w-screen-2xl px-9 py-3`}>
                        <AntForm.Item
                            label="Title"
                            validateStatus={touched.title && errors.title ? 'error' : ''}
                            help={touched.title && errors.title}
                        >
                            <Input
                                name="title"
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter title"
                            />
                        </AntForm.Item>

                        <AntForm.Item
                            label="Price"
                            validateStatus={touched.price && errors.price ? 'error' : ''}
                            help={touched.price && errors.price}
                        >
                            <Input
                                type="number"
                                name="price"
                                value={values.price}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter price"
                            />
                        </AntForm.Item>

                        <AntForm.Item
                            label="Description"
                            validateStatus={touched.description && errors.description ? 'error' : ''}
                            help={touched.description && errors.description}
                        >
                            <ReactQuill
                                value={values.description}
                                onChange={(_content, _delta, _source, editor) => {
                                    setFieldValue('description', editor.getHTML());
                                }}
                                onBlur={() => handleBlur({ target: { name: 'description' } })}
                                placeholder="Enter description"
                            />

                        </AntForm.Item>

                        <AntForm.Item
                            label="Status"
                            validateStatus={touched.status && errors.status ? 'error' : ''}
                            help={touched.status && errors.status}
                        >
                            <Select
                                value={values.status}
                                onChange={(value) => setFieldValue('status', value)}
                                onBlur={handleBlur}
                                placeholder="Select status"
                            >
                                <Option value="active">Active</Option>
                                <Option value="inactive">Inactive</Option>
                            </Select>
                        </AntForm.Item>

                        <AntForm.Item
                            label="Images"
                            validateStatus={touched.images && errors.images ? 'error' : ''}
                            help={touched.images && errors.images as []}
                        >
                            <Upload
                                name="images"
                                listType="picture-card"
                                multiple={true}
                                fileList={values.images.map((file) => ({
                                    uid: file.name,
                                    name: file.name,
                                    status: 'done',
                                    url: URL.createObjectURL(file),
                                }))}
                                beforeUpload={(file) => {
                                    setFieldValue('images', [...values.images, file]);
                                    return false;
                                }}
                                onRemove={(file) => {
                                    setFieldValue(
                                        'images',
                                        values.images.filter((image) => image.name !== file.name)
                                    );
                                }}
                                onPreview={(file) => {
                                    const src = file.url || file.preview;
                                    const imgWindow = window.open(src);
                                    imgWindow && imgWindow.document.write(`<img src="${src}" alt="Изображение"/>`);
                                }}
                            >
                                <Button icon={<UploadOutlined />}>Select Images</Button>
                            </Upload>
                        </AntForm.Item>

                        <AntForm.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </AntForm.Item>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default CreateProductForm;
