import { useQuery } from '@tanstack/react-query';
import { Card, Col, Form, Input, Row, Select, Space } from 'antd';
import { getTenants } from '../../../http/api';
import { Tenant } from '../../../types';

const UserForm = () => {
    const { data: tenants } = useQuery({
        queryKey: ['tenants'],
        queryFn: getTenants,
    });
    return (
        <Row>
            <Col span={24}>
                <Space direction="vertical" size={'middle'}>
                    <Card title="Basic info">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="First name"
                                    name="firstName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Firstname is required',
                                        },
                                    ]}>
                                    <Input type="text" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Last name"
                                    name="lastName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Lastname is required',
                                        },
                                    ]}>
                                    <Input size="middle" type="text" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Email is required',
                                        },
                                        {
                                            type: 'email',
                                            message: 'Email is not valid',
                                        },
                                    ]}>
                                    <Input size="middle" type="text" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    <Card title="Security info">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Password is requirred',
                                        },
                                    ]}>
                                    <Input size="middle" type="password" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    <Card title="Role">
                        <Row gutter={20}>
                            <Col span={12}>
                                <Form.Item
                                    label="Role"
                                    name="role"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Roles are required',
                                        },
                                    ]}>
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="Role"
                                        allowClear={true}
                                        onChange={() => {}}>
                                        <Select.Option value="admin">
                                            Admin
                                        </Select.Option>
                                        <Select.Option value="manager">
                                            Manager
                                        </Select.Option>
                                        <Select.Option value="customer">
                                            Customer
                                        </Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Tenant Id"
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
                                        {tenants?.data?.map(
                                            (tenant: Tenant) => (
                                                <Select.Option
                                                    value={tenant.id}>
                                                    {tenant.id}.{tenant.name}
                                                </Select.Option>
                                            )
                                        )}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Space>
            </Col>
        </Row>
    );
};

export default UserForm;
