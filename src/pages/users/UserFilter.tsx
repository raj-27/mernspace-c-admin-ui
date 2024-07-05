import { Card, Flex, Input, Select, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React from 'react';

type UsersFilterProps = {
    onFilterChange: (filterName: string, filterValue: string) => void;
    children: React.ReactNode;
};
const UserFilter = ({ onFilterChange, children }: UsersFilterProps) => {
    return (
        <Card bordered={false}>
            <Flex gap={10} justify="space-between" align="center">
                <Space>
                    <Input
                        placeholder="Search"
                        prefix={<SearchOutlined />}
                        onChange={(e) =>
                            onFilterChange('userSearchQuery', e.target.value)
                        }
                    />
                    <Select
                        style={{ width: 120 }}
                        placeholder="Role"
                        allowClear={true}
                        onChange={(selectedItem) =>
                            onFilterChange('roleFilter', selectedItem)
                        }>
                        <Select.Option value="admin">Admin</Select.Option>
                        <Select.Option value="manager">Manager</Select.Option>
                        <Select.Option value="customer">Customer</Select.Option>
                    </Select>
                    <Select
                        style={{ width: 120 }}
                        placeholder="Status"
                        allowClear={true}
                        onChange={(selectedItem) =>
                            onFilterChange('statusFillter', selectedItem)
                        }>
                        <Select.Option value="ban">Ban</Select.Option>
                        <Select.Option value="active">Active</Select.Option>
                    </Select>
                </Space>
                {children}
            </Flex>
        </Card>
    );
};

export default UserFilter;
