import { Form, Space, Typography, Upload, UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

const ProductImage = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const uploaderConfig: UploadProps = {
        name: 'file',
        multiple: false,
        showUploadList: false,
        beforeUpload: (file) => {
            // validation logic can be added
            // size validation can also added
            setImageUrl(URL.createObjectURL(file));
            return false;
        },
    };
    return (
        <Form.Item
            label=""
            name="image"
            rules={[
                {
                    required: true,
                    message: 'Please upload a product image',
                },
            ]}>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                {...uploaderConfig}>
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="product-image"
                        style={{ width: '100%' }}
                    />
                ) : (
                    <Space direction="vertical">
                        <PlusOutlined />
                        <Typography.Text>Upload</Typography.Text>
                    </Space>
                )}
            </Upload>
        </Form.Item>
    );
};

export default ProductImage;
