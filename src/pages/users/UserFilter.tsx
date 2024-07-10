import { Card, Flex, Form, Input, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { UsersFilterProps } from '../../types';

const UserFilter = ({ children }: UsersFilterProps) => {
    return (
        <Card bordered={false}>
            <Flex gap={10} justify="space-between" align="center">
                <Space>
                    <Form.Item name="q">
                        <Input
                            placeholder="Search"
                            prefix={<SearchOutlined />}
                        />
                    </Form.Item>
                    <Form.Item name="role">
                        <Select
                            style={{ width: 120 }}
                            placeholder="Role"
                            allowClear={true}>
                            <Select.Option value="admin">Admin</Select.Option>
                            <Select.Option value="manager">
                                Manager
                            </Select.Option>
                            <Select.Option value="customer">
                                Customer
                            </Select.Option>
                        </Select>
                    </Form.Item>
                    {/* <Select
                        style={{ width: 120 }}
                        placeholder="Status"
                        allowClear={true}
                       >
                        <Select.Option value="ban">Ban</Select.Option>
                        <Select.Option value="active">Active</Select.Option>
                    </Select> */}
                </Space>
                {children}
            </Flex>
        </Card>
    );
};

export default UserFilter;
