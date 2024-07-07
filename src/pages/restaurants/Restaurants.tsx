import { Breadcrumb, Button, Drawer, Space, Table, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link, Navigate } from 'react-router-dom';
import RestaurantFilter from './RestaurantFilter';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../store';
import { getTenants } from '../../http/api';

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Edit',
        dataIndex: 'edit',
        key: 'edit',
        render: () => <Tag color="orange">Edit</Tag>,
    },
];

const Restaurants = () => {
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const { user } = useAuthStore();
    if (user?.role !== 'admin') {
        return <Navigate to={'/'} replace={true} />;
    }
    const { data: tenants, isLoading } = useQuery({
        queryKey: ['tenants'],
        queryFn: getTenants,
    });
    if (isLoading) {
        return <h4>Loading...</h4>;
    }
    console.log(tenants);

    return (
        <Space direction="vertical" style={{ width: '100%' }} size={'large'}>
            <Breadcrumb
                items={[
                    { title: <Link to={'/'}>Dashboard</Link> },
                    { title: 'Restaurants' },
                ]}
            />
            <RestaurantFilter
                onFilterChange={(filterName, filterValue) => {
                    console.log({ filterName, filterValue });
                }}>
                <Button
                    type="primary"
                    onClick={() => setDrawerOpen(true)}
                    icon={<PlusOutlined />}>
                    Create Tenant
                </Button>
            </RestaurantFilter>
            <Table columns={columns} dataSource={tenants?.data} rowKey={'id'} />

            <Drawer
                title="Create Tenant"
                open={drawerOpen}
                width={650}
                onClose={() => setDrawerOpen(false)}
                destroyOnClose={true}
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

export default Restaurants;
