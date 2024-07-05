import { Breadcrumb, Button, Drawer, Space, Table, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { Link, Navigate } from 'react-router-dom';
import { getUsers } from '../../http/api';
import { useQuery } from '@tanstack/react-query';
import { Tenant, useAuthStore } from '../../store';
import { User } from '../../types';
import UserFilter from './UserFilter';
import { useState } from 'react';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'firstName',
        key: 'firstName',
        render: (_: string, record: User) => {
            return (
                <div>
                    {record.firstName} {record.lastName}
                </div>
            );
        },
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        render: (text: string) => {
            return <Tag color="orange">{text}</Tag>;
        },
    },
    {
        title: 'Tenant',
        dataIndex: 'tenant',
        ley: 'tenant',
        render: (tenant: Tenant) => {
            return <div>{tenant?.name ?? 'null'}</div>;
        },
    },
];

const Users = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { user } = useAuthStore();
    if (user?.role !== 'admin') {
        return <Navigate to={'/'} replace={true} />;
    }
    const { data: users, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });

    if (isLoading) {
        return <h4>Loading...</h4>;
    }

    console.log(users);
    return (
        <Space direction="vertical" size={'large'} style={{ width: '100%' }}>
            <Breadcrumb
                items={[
                    {
                        title: <Link to={'/'}>Dashboard</Link>,
                    },
                    { title: 'Users' },
                ]}
            />
            <UserFilter
                onFilterChange={(filterName, filterValue) => {
                    console.log({ filterName, filterValue });
                }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setDrawerOpen(true)}>
                    Create User
                </Button>
            </UserFilter>
            <Table columns={columns} dataSource={users?.data} rowKey={'id'} />
            <Drawer
                title="Create User"
                open={drawerOpen}
                width={650}
                onClose={() => setDrawerOpen(false)}
                extra={
                    <Space>
                        <Button onClick={() => setDrawerOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="primary">Submit</Button>
                    </Space>
                }></Drawer>
        </Space>
    );
};

export default Users;
