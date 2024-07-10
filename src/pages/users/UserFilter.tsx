import { Card, Flex, Form, Input, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { UsersFilterProps } from '../../types';
import { useRef } from 'react';

const UserFilter = ({ onFilterChange, children }: UsersFilterProps) => {
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    return (
        <Card bordered={false}>
            <Flex gap={10} justify="space-between" align="center">
                <Space>
                    <Form.Item name="q">
                        <Input
                            placeholder="Search"
                            prefix={<SearchOutlined />}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (debounceTimer.current) {
                                    clearTimeout(debounceTimer.current);
                                }
                                debounceTimer.current = setTimeout(() => {
                                    onFilterChange('userSearchQuery', value);
                                }, 300); // 300ms delay
                            }}
                        />
                    </Form.Item>
                    <Form.Item name="role">
                        <Select
                            style={{ width: 120 }}
                            placeholder="Role"
                            allowClear={true}
                            onChange={(selectedItem) =>
                                onFilterChange('roleFilter', selectedItem)
                            }>
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
                        onChange={(selectedItem) =>
                            onFilterChange('statusFillter', selectedItem)
                        }>
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
