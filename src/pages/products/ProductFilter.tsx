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

type ProductFilterProps = {
    children?: React.ReactNode;
};

const ProductFilter = ({ children }: ProductFilterProps) => {
    return (
        <>
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
                                <Form.Item name="category">
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="Select Category"
                                        allowClear={true}>
                                        <Select.Option value="pizza">
                                            Pizza
                                        </Select.Option>
                                        <Select.Option value="beverages">
                                            Beverages
                                        </Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item name="restaurent">
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="Select Restaurent"
                                        allowClear={true}>
                                        <Select.Option value="pizza hub">
                                            Pizza Hub
                                        </Select.Option>
                                        <Select.Option value="softy corner">
                                            Softy Corner
                                        </Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Space>
                                    <Switch
                                        defaultChecked
                                        onChange={() => {}}
                                    />
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
        </>
    );
};

export default ProductFilter;
