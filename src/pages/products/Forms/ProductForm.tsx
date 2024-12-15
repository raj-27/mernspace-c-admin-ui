import {
    Card,
    Col,
    Form,
    FormInstance,
    Input,
    Row,
    Select,
    Space,
    Switch,
    Typography,
} from 'antd';
import { Tenant } from '../../../types';
import { getCategories, getTenants } from '../../../http/api';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../../store';
import { ROLES } from '../../../constants';
import Pricing from './Pricing';
import Attribute from './Attribute';
import ProductImage from './ProductImage';

const ProductForm = ({ form }: { form: FormInstance }) => {
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
                                            (category: any) => (
                                                <Select.Option
                                                    value={category._id}
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
                                <ProductImage
                                    initialImage={form.getFieldValue('image')}
                                />
                            </Col>
                        </Row>
                    </Card>

                    {/* Tenant Info */}
                    {user!.role === ROLES.ADMIN && (
                        <Card title="Tenant Info">
                            <Row gutter={20}>
                                <Col span={24}>
                                    <Form.Item
                                        label="Tenant Info"
                                        name="tenantId"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Tenant id is required',
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
                                                        value={String(
                                                            tenant.id
                                                        )}
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
                    )}

                    {/* Dynamic Pricing */}
                    {selectedCategory && (
                        <Pricing selectedCategory={selectedCategory} />
                    )}
                    {selectedCategory && (
                        <Attribute selectedCategory={selectedCategory} />
                    )}
                    {/* Other Property */}
                    <Card title="Other Properties">
                        <Row gutter={20}>
                            <Col span={24}>
                                <Space>
                                    <Form.Item name="isPublish">
                                        <Switch
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
