import {
    Card,
    Col,
    Form,
    Input,
    Row,
    Select,
    Space,
    Switch,
    Typography,
    Upload,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Category, Tenant } from '../../../types';
import { getCategories, getTenants } from '../../../http/api';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../../store';
import { ROLES } from '../../../constants';
import Pricing from './Pricing';
import Attribute from './Attribute';

const ProductForm = () => {
    // const role = Form.useWatch('role');
    const selectedCategory = Form.useWatch('categoryId');

    const { user } = useAuthStore();
    const { data: restaurants } = useQuery({
        queryKey: ['restaurants'],
        queryFn: () => {
            if (user!.role === ROLES.ADMIN) {
                return getTenants();
            }
            return;
        },
    });

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => {
            return getCategories();
        },
    });

    return (
        <Row>
            <Col span={24}>
                <Space direction="vertical" size={'middle'}>
                    <Card title="Product info">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Product Name"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Product name is required',
                                        },
                                    ]}>
                                    <Input type="text" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Category"
                                    name="categoryId"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Category is required',
                                        },
                                    ]}>
                                    <Select
                                        size="large"
                                        style={{ width: '100%' }}
                                        placeholder="Select Category"
                                        allowClear={true}
                                        onChange={() => {}}>
                                        {categories?.data?.categories.map(
                                            (category: Category) => (
                                                <Select.Option
                                                    value={JSON.stringify(
                                                        category
                                                    )}
                                                    key={category._id}>
                                                    {category.name}
                                                </Select.Option>
                                            )
                                        )}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    label="Descriptiom"
                                    name="description"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Description  is required',
                                        },
                                    ]}>
                                    <Input.TextArea
                                        rows={3}
                                        maxLength={100}
                                        size="large"
                                        style={{ resize: 'none' }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    {/* Product Image */}
                    <Card title="Product Image">
                        <Row gutter={20}>
                            <Col span={12}>
                                <Form.Item
                                    label=""
                                    name="image"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please upload a product image',
                                        },
                                    ]}>
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload">
                                        <Space direction="vertical">
                                            <PlusOutlined />
                                            <Typography.Text>
                                                Upload
                                            </Typography.Text>
                                        </Space>
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    {/* Tenant Info */}
                    <Card title="Tenant Info">
                        <Row gutter={20}>
                            <Col span={24}>
                                <Form.Item
                                    label="Tenant Info"
                                    name="tenantId"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Tenant id is required',
                                        },
                                    ]}>
                                    <Select
                                        size="large"
                                        style={{ width: '100%' }}
                                        placeholder="Tenant id"
                                        allowClear={true}
                                        onChange={() => {}}>
                                        {restaurants?.data?.data?.map(
                                            (tenant: Tenant) => (
                                                <Select.Option
                                                    value={tenant.id}
                                                    key={tenant.id}>
                                                    {tenant.name}
                                                </Select.Option>
                                            )
                                        )}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    {/* Dynamic Pricing */}
                    {selectedCategory && (
                        <Pricing
                            selectedCategory={
                                selectedCategory
                                    ? JSON.parse(selectedCategory)
                                    : null
                            }
                        />
                    )}
                    {selectedCategory && <Attribute />}
                    {/* Other Property */}
                    <Card title="Other Properties">
                        <Row gutter={20}>
                            <Col span={24}>
                                <Space>
                                    <Form.Item name="isPublish">
                                        <Switch
                                            onChange={() => {}}
                                            checkedChildren="Yes"
                                            unCheckedChildren="No"
                                        />
                                    </Form.Item>
                                    <Typography.Text
                                        style={{
                                            marginBottom: 21,
                                            display: 'inline-block',
                                        }}>
                                        Publish
                                    </Typography.Text>
                                </Space>
                            </Col>
                        </Row>
                    </Card>
                </Space>
            </Col>
        </Row>
    );
};

export default ProductForm;
