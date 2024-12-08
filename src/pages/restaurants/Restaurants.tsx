import { Breadcrumb, Button, Drawer, Form, Space, Table, theme } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link, Navigate } from 'react-router-dom';
import RestaurantFilter from './RestaurantFilter';
import { useEffect, useMemo, useState } from 'react';
import {
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import { Tenant, useAuthStore } from '../../store';
import { createTenant, getTenants, updateTenant } from '../../http/api';
import RestaurantForm from './Forms/RestaurantForm';
import { FieldData } from 'rc-field-form/lib/interface';
import { debounce } from 'lodash';

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
];

const Restaurants = () => {
    const [tenantQueryParams, setTenantQueryParams] = useState({
        currentPage: 1,
        perPage: 5,
    });
    const [currentEditingTenant, setCurrentEditingTenant] =
        useState<Tenant | null>(null);

    const queryClient = useQueryClient();
    const [form] = Form.useForm();
    const [filterForm] = Form.useForm();
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const { user } = useAuthStore();
    const {
        token: { colorBgLayout },
    } = theme.useToken();

    if (user?.role !== 'admin') {
        return <Navigate to={'/'} replace={true} />;
    }

    useEffect(() => {
        if (currentEditingTenant) {
            setDrawerOpen(true);
            form.setFieldsValue(currentEditingTenant);
        }
    }, [currentEditingTenant]);

    const debouncedQUpdate = useMemo(() => {
        return debounce((value: string | undefined | unknown) => {
            setTenantQueryParams((prev) => ({ ...prev, q: value }));
        }, 1000);
    }, []);

    const { data: tenants, isLoading } = useQuery({
        queryKey: ['tenants', tenantQueryParams],
        queryFn: async () => {
            const filterParams = Object.fromEntries(
                Object.entries(tenantQueryParams).filter((item) => !!item[1])
            );
            const queryString = new URLSearchParams(
                filterParams as unknown as Record<string, string>
            ).toString();
            return getTenants(queryString).then((res) => res.data);
        },
        placeholderData: keepPreviousData,
    });

    const { mutate: tenantMutate } = useMutation({
        mutationKey: ['tenant'],
        mutationFn: createTenant,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tenants'] });
            setDrawerOpen(false);
            form.resetFields();
            return;
        },
    });

    const { mutate: updateTenantMutate } = useMutation({
        mutationKey: ['update-tenant'],
        mutationFn: async (data: Tenant) =>
            await updateTenant(data, currentEditingTenant!.id).then(
                (res) => res.data
            ),
        onSuccess: () => {
            console.log('Succcess');
            queryClient.invalidateQueries({ queryKey: ['tenants'] });
            form.resetFields();
            setCurrentEditingTenant(null);
            setDrawerOpen(false);
            return;
        },
    });

    if (isLoading) {
        return <h4>Loading...</h4>;
    }

    const onHandleSubmit = async () => {
        await form.validateFields();
        let isEditMode = !!currentEditingTenant;
        if (isEditMode) {
            // Updating Current Tenant
            updateTenantMutate(form.getFieldsValue());
        } else {
            // Creating new tenant
            tenantMutate(form.getFieldsValue());
        }
    };
    console.log({ currentEditingTenant });

    const onFilterFieldChange = (changeFields: FieldData[]) => {
        let [changeFilterData] = changeFields.map((field) => {
            return {
                [field.name[0]]: field.value,
            };
        });
        if ('q' in changeFilterData) {
            debouncedQUpdate(changeFilterData.q);
        }
    };

    return (
        <Space direction="vertical" style={{ width: '100%' }} size={'large'}>
            <Breadcrumb
                items={[
                    { title: <Link to={'/'}>Dashboard</Link> },
                    { title: 'Restaurants' },
                ]}
            />
            <Form form={filterForm} onFieldsChange={onFilterFieldChange}>
                <RestaurantFilter>
                    <Button
                        type="primary"
                        onClick={() => setDrawerOpen(true)}
                        icon={<PlusOutlined />}>
                        Create Tenant
                    </Button>
                </RestaurantFilter>
            </Form>
            <Table
                columns={[
                    ...columns,
                    {
                        title: 'Edit',
                        dataIndex: 'edit',
                        key: 'edit',
                        render: (_, record: Tenant) => (
                            <Button
                                type="link"
                                onClick={() => {
                                    setCurrentEditingTenant(record);
                                }}>
                                Edit
                            </Button>
                        ),
                    },
                ]}
                dataSource={tenants?.data}
                rowKey={'id'}
                pagination={{
                    current: tenantQueryParams.currentPage,
                    pageSize: tenantQueryParams.perPage,
                    total: tenants.count,
                    onChange: (value) => {
                        setTenantQueryParams((prev) => ({
                            ...prev,
                            currentPage: value,
                        }));
                    },
                }}
            />

            <Drawer
                title={currentEditingTenant ? 'Edit Tenant' : 'Create Tenant'}
                open={drawerOpen}
                styles={{ body: { background: colorBgLayout } }}
                width={650}
                onClose={() => {
                    setDrawerOpen(false);
                    setCurrentEditingTenant(null);
                }}
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
                        <Button type="primary" onClick={onHandleSubmit}>
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
