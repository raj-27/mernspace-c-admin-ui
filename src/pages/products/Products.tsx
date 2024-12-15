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
import { useEffect, useMemo, useState } from 'react';
import { PER_PAGE, ROLES } from '../../constants';
import {
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import { createProduct, getProducts, updateProduct } from '../../http/api';
import { FieldData } from 'rc-field-form/lib/interface';
import { debounce } from 'lodash';
import { useAuthStore } from '../../store';
import ProductForm from './Forms/ProductForm';
import { makeFormData } from './helper';

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
    const [selectedProduct, setCurrentProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (selectedProduct) {
            setDrawerOpen(true);
            const priceConfiguration = Object.entries(
                selectedProduct.priceConfiguration
            ).reduce((acc, [key, value]) => {
                const stringifiedKey = JSON.stringify({
                    configurationKey: key,
                    priceType: value.priceType,
                });
                return {
                    ...acc,
                    [stringifiedKey]: value.availableOptions,
                };
            }, {});

            const attributes = selectedProduct.attributes.reduce(
                (acc, item) => {
                    return {
                        ...acc,
                        [item.name]: item.value,
                    };
                },
                {}
            );

            form.setFieldsValue({
                ...selectedProduct,
                priceConfiguration,
                attributes,
                // Todo fix this
                categoryId: selectedProduct.category._id,
            });
        }
    }, [selectedProduct]);

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

    const queryClient = useQueryClient();
    const { mutate: productMutate, isPending } = useMutation({
        mutationKey: ['product'],
        mutationFn: async (data: FormData) => {
            if (selectedProduct) {
                // edit mode
                return updateProduct(data, selectedProduct._id).then(
                    (res) => res.data
                );
            } else {
                // create mode
                return createProduct(data).then((res) => res.data);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            setDrawerOpen(false);
            form.resetFields();
            return;
        },
    });

    const onHandleSubmit = async () => {
        // const dummy = {
        //     Size: { priceType: 'base', availableOptions: { Small: 400, Medium: 600, Large: 800 } },
        //     Crust: { priceType: 'aditional', availableOptions: { Thin: 50, Thick: 100 } },
        // };

        // const currentData = {
        //     '{"configurationKey":"Size","priceType":"base"}': {
        //         Small: 100,
        //         Medium: 200,
        //         Large: 400,
        //     },
        //     '{"configurationKey":"Crust","priceType":"aditional"}': {
        //         Thin: 0,
        //         Thick: 50,
        //     },
        // };

        await form.validateFields();

        const priceConfiguration = form.getFieldValue('priceConfiguration');
        const pricing = Object.entries(priceConfiguration).reduce(
            (acc, [key, value]) => {
                const parsedKey = JSON.parse(key);
                return {
                    ...acc,
                    [parsedKey.configurationKey]: {
                        priceType: parsedKey.priceType,
                        availableOptions: value,
                    },
                };
            },
            {}
        );

        const categoryId = form.getFieldValue('categoryId');
        // const currentAttrs = {
        //     isHit: 'No',
        //     Spiciness: 'Less',
        // };

        // const attrs = [
        //     { name: 'Is Hit', value: true },
        //     { name: 'Spiciness', value: 'Hot' },
        // ];

        const attributes = Object.entries(form.getFieldValue('attributes')).map(
            ([key, value]) => {
                return {
                    name: key,
                    value: value,
                };
            }
        );

        const postData = {
            ...form.getFieldsValue(),
            tenantId:
                user!.role === 'manager'
                    ? user?.tenant?.id
                    : form.getFieldValue('tenantId'),
            isPublish: form.getFieldValue('isPublish') ? true : false,
            image: form.getFieldValue('image'),
            categoryId,
            priceConfiguration: pricing,
            attributes,
        };

        const formData = makeFormData(postData);
        await productMutate(formData);
    };

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
                            render: (_, record: Product) => {
                                return (
                                    <Button
                                        type="link"
                                        onClick={() =>
                                            setCurrentProduct(record)
                                        }>
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
                    title={selectedProduct ? 'Update Product' : 'Add Product'}
                    open={drawerOpen}
                    styles={{ body: { background: colorBgLayout } }}
                    width={650}
                    onClose={() => {
                        setDrawerOpen(false);
                        form.resetFields();
                        setCurrentProduct(null);
                    }}
                    destroyOnClose={true}
                    extra={
                        <Space>
                            <Button
                                onClick={() => {
                                    setDrawerOpen(false);
                                    form.resetFields();
                                    setCurrentProduct(null);
                                }}>
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                onClick={onHandleSubmit}
                                loading={isPending}>
                                Submit
                            </Button>
                        </Space>
                    }>
                    <Form layout="vertical" form={form}>
                        {/* <UserForm isEditMode={!!currentEditingUser} /> */}
                        <ProductForm form={form} />
                    </Form>
                </Drawer>
            </Space>
        </>
    );
};

export default Products;
