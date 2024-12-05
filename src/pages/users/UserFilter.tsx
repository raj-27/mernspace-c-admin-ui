import { Card, Col, Form, Input, Row, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { UsersFilterProps } from '../../types';

const UserFilter = ({ children }: UsersFilterProps) => {
    return (
        <Card bordered={false}>
            <Row justify="space-between">
                <Col span={16}>
                    <Row gutter={20}>
                        <Col span={8}>
                            <Form.Item name="q">
                                <Input
                                    placeholder="Search"
                                    prefix={<SearchOutlined />}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="role">
                                <Select
                                    style={{ width: 120 }}
                                    placeholder="Role"
                                    allowClear={true}>
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
                    </Row>
                </Col>
                <Col
                    span={8}
                    style={{ display: 'flex', justifyContent: 'end' }}>
                    {children}
                </Col>
            </Row>
        </Card>
    );
};

export default UserFilter;
