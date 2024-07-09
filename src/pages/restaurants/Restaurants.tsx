import { Breadcrumb, Button, Drawer, Form, Space, Table, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link, Navigate } from 'react-router-dom';
import RestaurantFilter from './RestaurantFilter';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../store';
import { createTenant, getTenants } from '../../http/api';
import RestaurantForm from './Forms/RestaurantForm';

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
    const queryClient = useQueryClient();
    const [form] = Form.useForm();
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const { user } = useAuthStore();

    if (user?.role !== 'admin') {
        return <Navigate to={'/'} replace={true} />;
    }
    const { data: tenants, isLoading } = useQuery({
        queryKey: ['tenants'],
        queryFn: getTenants,
    });

    const { mutate: tenantMutate } = useMutation({
        mutationKey: ['user'],
        mutationFn: createTenant,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tenants'] });
            setDrawerOpen(false);
            form.resetFields();
            return;
        },
    });

    if (isLoading) {
        return <h4>Loading...</h4>;
    }

    const handleFormSubmit = async () => {
        await form.validateFields();
        tenantMutate(form.getFieldsValue());
    };

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
                        <Button
                            onClick={() => {
                                setDrawerOpen(false);
                                form.resetFields();
                            }}>
                            Cancel
                        </Button>
                        <Button type="primary" onClick={handleFormSubmit}>
                            Submit
                        </Button>
                    </Space>
                }>
                <Form form={form} layout="vertical">
                    <RestaurantForm />
                </Form>
            </Drawer>
        </Space>
    );
};

export default Restaurants;
