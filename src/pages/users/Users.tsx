import {
    Breadcrumb,
    Button,
    Drawer,
    Flex,
    Form,
    Spin,
    Space,
    Table,
    Tag,
    theme,
} from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Link, Navigate } from 'react-router-dom';
import {
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import { createUser, getUsers } from '../../http/api';
import { FieldsData, Tenant, User } from '../../types';
import UserFilter from './UserFilter';
import { useMemo, useState } from 'react';
import UserForm from './Forms/UserForm';
import { debounce } from 'lodash';
import { useAuthStore } from '../../store';

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
            console.log(tenant);
            return <div>{tenant?.name ?? 'null'}</div>;
        },
    },
];

const Users = () => {
    const { user } = useAuthStore();
    if (user?.role !== 'admin') {
        return <Navigate to={'/'} replace={true} />;
    }
    const [form] = Form.useForm();
    const [filterForm] = Form.useForm();
    const queryClient = useQueryClient();
    const [queryParams, setQueryParams] = useState({
        perPage: 5,
        currentPage: 1,
    });
    const [drawerOpen, setDrawerOpen] = useState(false);
    const {
        token: { colorBgLayout },
    } = theme.useToken();

    const debouncedQUpdate = useMemo(() => {
        return debounce((value: string | undefined) => {
            setQueryParams((prev) => ({ ...prev, q: value }));
        }, 500);
    }, []);

    const {
        data: users,
        isFetching,
        isError,
        error,
    } = useQuery({
        queryKey: ['users', queryParams],
        queryFn: async () => {
            const filterParams = Object.fromEntries(
                Object.entries(queryParams).filter((item) => !!item[1])
            );
            const queryString = new URLSearchParams(
                filterParams as unknown as Record<string, string>
            ).toString();
            return getUsers(queryString).then((res) => res.data);
        },
        placeholderData: keepPreviousData,
    });

    const { mutate: userMutate } = useMutation({
        mutationKey: ['user'],
        mutationFn: createUser,
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            setDrawerOpen(false);
            form.resetFields();
            return;
        },
    });

    const handleFormSubmit = async () => {
        await form.validateFields();
        userMutate(form.getFieldsValue());
    };

    const onFilterChange = (changeFields: FieldsData[]) => {
        const [changeFilterFields] = changeFields.map((field) => ({
            [field.name[0]]: field.value,
        }));
        if ('q' in changeFilterFields) {
            debouncedQUpdate(changeFilterFields.q);
        } else {
            setQueryParams((prev) => ({ ...prev, ...changeFilterFields }));
        }
    };

    return (
        <Space direction="vertical" size={'large'} style={{ width: '100%' }}>
            <Flex justify="space-between" align="center">
                <Breadcrumb
                    items={[
                        {
                            title: <Link to={'/'}>Dashboard</Link>,
                        },
                        { title: 'Users' },
                    ]}
                />
                {isFetching && <Spin indicator={<LoadingOutlined spin />} />}
                {isError && <p>{error.message}</p>}
            </Flex>
            <Form form={filterForm} onFieldsChange={onFilterChange}>
                <UserFilter>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setDrawerOpen(true)}>
                        Create User
                    </Button>
                </UserFilter>
            </Form>
            <Table
                columns={columns}
                dataSource={users?.data}
                rowKey={'id'}
                pagination={{
                    total: users?.count,
                    pageSize: queryParams.perPage,
                    current: queryParams.currentPage,
                    onChange: (page) => {
                        setQueryParams((prev) => {
                            return {
                                ...prev,
                                currentPage: page,
                            };
                        });
                    },
                }}
            />
            <Drawer
                title="Create User"
                open={drawerOpen}
                styles={{ body: { background: colorBgLayout } }}
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
                <Form layout="vertical" form={form}>
                    <UserForm />
                </Form>
            </Drawer>
        </Space>
    );
};

export default Users;
