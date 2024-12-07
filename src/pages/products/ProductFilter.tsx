import React from 'react';
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
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { getCategories, getTenants } from '../../http/api';
import { Category, Tenant } from '../../types';

type ProductFilterProps = {
    children?: React.ReactNode;
};

const ProductFilter = ({ children }: ProductFilterProps) => {
    const { data: restaurants } = useQuery({
        queryKey: ['restaurants'],
        queryFn: () => {
            return getTenants('perPage=10&currentPage=1');
        },
    });

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => {
            return getCategories();
        },
    });

    return (
        <Card>
            <Row>
                <Col span={16}>
                    <Row gutter={10}>
                        <Col span={6}>
                            <Form.Item name="q">
                                <Input
                                    placeholder="Search"
                                    prefix={<SearchOutlined />}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="categoryId">
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="Select Category"
                                    allowClear={true}>
                                    {categories?.data?.categories?.map(
                                        (category: Category) => {
                                            return (
                                                <Select.Option
                                                    key={category._id}
                                                    value={category._id}>
                                                    {category?.name}
                                                </Select.Option>
                                            );
                                        }
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item name="tenantId">
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="Select Restaurent"
                                    allowClear={true}>
                                    {restaurants?.data?.data?.map(
                                        (restaurant: Tenant) => {
                                            return (
                                                <Select.Option
                                                    key={restaurant.id}
                                                    value={restaurant.id}>
                                                    {restaurant.name}
                                                </Select.Option>
                                            );
                                        }
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Space>
                                <Form.Item name="isPublish">
                                    <Switch onChange={() => {}} />
                                </Form.Item>
                                <Typography.Text>
                                    Show only publish
                                </Typography.Text>
                            </Space>
                        </Col>
                    </Row>
                </Col>
                <Col
                    span={8}
                    style={{
                        display: 'flex',
                        justifyContent: 'end',
                    }}>
                    {children}
                </Col>
            </Row>
        </Card>
    );
};

export default ProductFilter;
