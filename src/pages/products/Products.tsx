import {
    Breadcrumb,
    Button,
    Flex,
    Form,
    Space,
    Table,
    Tag,
    Typography,
    Image,
    Spin,
    Drawer,
    theme,
} from 'antd';
import {
    LoadingOutlined,
    PlusOutlined,
    RightOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ProductFilter from './ProductFilter';
import { Product } from '../../types';
import { useMemo, useState } from 'react';
import { PER_PAGE } from '../../constants';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getProducts } from '../../http/api';
import { FieldData } from 'rc-field-form/lib/interface';
import { debounce } from 'lodash';
import { useAuthStore } from '../../store';
import ProductForm from './Forms/ProductForm';

const columns = [
    {
        title: 'Product name',
        dataIndex: 'name',
        key: 'name',
        render: (_: string, record: Product) => {
            return (
                <div>
                    <Space>
                        <Image src={record.image} width={80} />
                        <Typography.Text>{record.name}</Typography.Text>
                    </Space>
                </div>
            );
        },
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: (_: string, record: Product) => {
            return <Tag color="orange">{record.category.name}</Tag>;
        },
    },
    {
        title: 'Status',
        dataIndex: 'isPublish',
        key: 'isPublish',
        render: (_: string, record: Product) => {
            return (
                <Tag color={`${record.isPublish ? 'green' : 'red'}`}>
                    {record?.isPublish ? 'Publish' : 'Draft'}
                </Tag>
            );
        },
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        // render: (tenant: Tenant) => {
        //     return <div>{tenant?.name ?? 'null'}</div>;
        // },
    },
];

const Products = () => {
    const { user } = useAuthStore();
    const [form] = Form.useForm();
    const [filterForm] = Form.useForm();
    const [queryParams, setQueryParams] = useState({
        limit: PER_PAGE,
        page: 1,
        tenantId: user!.tenant?.id,
    });
    const [drawerOpen, setDrawerOpen] = useState(false);
    const {
        token: { colorBgLayout },
    } = theme.useToken();

    const {
        data: products,
        isFetching,
        isError,
        error,
    } = useQuery({
        queryKey: ['products', queryParams],
        queryFn: async () => {
            const filterParams = Object.fromEntries(
                Object.entries(queryParams).filter((item) => !!item[1])
            );
            const queryString = new URLSearchParams(
                filterParams as unknown as Record<string, string>
            ).toString();
            return getProducts(queryString).then((res) => res.data);
        },
        placeholderData: keepPreviousData,
    });

    const onFilterChange = (changeFields: FieldData[]) => {
        const [changeFilterFields] = changeFields.map((field) => ({
            [field.name[0]]: field.value,
        }));
        if ('q' in changeFilterFields) {
            debouncedQUpdate(changeFilterFields.q as string);
        } else {
            setQueryParams((prev) => ({
                ...prev,
                ...changeFilterFields,
                page: 1,
            }));
        }
    };

    const debouncedQUpdate = useMemo(() => {
        return debounce((value: string | undefined) => {
            setQueryParams((prev) => ({ ...prev, q: value, page: 1 }));
        }, 500);
    }, []);

    const onHandleSubmit = () => {};

    return (
        <>
            <Space
                direction="vertical"
                size={'large'}
                style={{ width: '100%' }}>
                <Flex justify="space-between" align="center">
                    <Breadcrumb
                        separator={<RightOutlined />}
                        items={[
                            { title: <Link to={'/'}>Dashboard</Link> },
                            { title: 'Products' },
                        ]}
                    />
                    {isFetching && (
                        <Spin indicator={<LoadingOutlined spin />} />
                    )}
                    {isError && (
                        <Typography.Text type="danger" code>
                            {error.message}
                        </Typography.Text>
                    )}
                </Flex>
                <Form form={filterForm} onFieldsChange={onFilterChange}>
                    <ProductFilter>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setDrawerOpen(true)}>
                            Add Product
                        </Button>
                    </ProductFilter>
                </Form>
                <Table
                    columns={[
                        ...columns,
                        {
                            title: 'Action',
                            dataIndex: 'tenant',
                            key: 'tenant',
                            render: () => {
                                return (
                                    <Button type="link" onClick={() => {}}>
                                        Edit
                                    </Button>
                                );
                            },
                        },
                    ]}
                    dataSource={products?.data}
                    rowKey={'id'}
                    pagination={{
                        total: products?.total,
                        pageSize: queryParams.limit,
                        current: queryParams.page,
                        onChange: (page) => {
                            setQueryParams((prev) => {
                                return {
                                    ...prev,
                                    page: page,
                                };
                            });
                        },
                        showTotal(total, range) {
                            return `showing ${range[0]}-${range[1]} of total ${total}`;
                        },
                    }}
                />
                <Drawer
                    title={'Create Product'}
                    open={drawerOpen}
                    styles={{ body: { background: colorBgLayout } }}
                    width={650}
                    onClose={() => {
                        setDrawerOpen(false);
                        form.resetFields();
                        // setCurrentEditingUser(null);
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
                    <Form layout="vertical" form={form}>
                        {/* <UserForm isEditMode={!!currentEditingUser} /> */}
                        <ProductForm />
                    </Form>
                </Drawer>
            </Space>
        </>
    );
};

export default Products;
