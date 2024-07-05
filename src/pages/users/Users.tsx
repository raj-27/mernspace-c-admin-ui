import { Breadcrumb, Space, Table, Tag } from 'antd';
import { Link, Navigate } from 'react-router-dom';
import { getUsers } from '../../http/api';
import { useQuery } from '@tanstack/react-query';
import { Tenant, useAuthStore } from '../../store';
import { User } from '../../types';
import UserFilter from './UserFilter';

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
                }}
            />
            <Table columns={columns} dataSource={users?.data} rowKey={'id'} />
        </Space>
    );
};

export default Users;
