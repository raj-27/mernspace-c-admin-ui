import { useQuery } from '@tanstack/react-query';
import { Card, Col, Form, Input, Row, Select, Space } from 'antd';
import { getTenants } from '../../../http/api';
import { Tenant } from '../../../types';

const UserForm = () => {
    const { data: tenants, isLoading } = useQuery({
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
                                <Form.Item label="First name" name="firstname">
                                    <Input type="text" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Last name" name="lastname">
                                    <Input size="middle" type="text" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Email" name="email">
                                    <Input size="middle" type="text" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    <Card title="Security info">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Password" name="password">
                                    <Input size="middle" type="password" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    <Card title="Role">
                        <Row gutter={20}>
                            <Col span={12}>
                                <Form.Item label="Role" name="role">
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
                                <Form.Item label="Tenant Id" name="tenantid">
                                    <Select
                                        size="large"
                                        style={{ width: '100%' }}
                                        placeholder="Tenant id"
                                        allowClear={true}
                                        onChange={() => {}}>
                                        {tenants?.data?.map(
                                            (tenant: Tenant) => (
                                                <Select.Option
                                                    value={tenant.name}>
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
