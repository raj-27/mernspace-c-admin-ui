import {
    Breadcrumb,
    Button,
    Drawer,
    Flex,
    Form,
    Image,
    Space,
    Spin,
    Table,
    Tag,
    theme,
    Typography,
} from 'antd';
import {
    LoadingOutlined,
    PlusOutlined,
    RightOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ToppingFilter from './ToppingFilter';
import { useEffect, useMemo, useState } from 'react';
import { PER_PAGE, ROLES } from '../../constants';
import { useAuthStore } from '../../store';
import { FieldData } from 'rc-field-form/lib/interface';
import { debounce } from 'lodash';
import {
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import { createTopping, getToppings, updateTopping } from '../../http/api';
import { Topping } from '../../types';
import ToppingForm from './Form/ToppingForm';
import { makeFormData } from '../../Utils/makeFormData';

const columns = [
    {
        title: 'Topping Image',
        dataIndex: 'image',
        key: 'image',
        render: (_: string, record: Topping) => {
            return (
                <div>
                    <Space>
                        <Image src={record.image} width={80} />
                    </Space>
                </div>
            );
        },
    },
    {
        title: 'Topping Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Status',
        dataIndex: 'isPublish',
        key: 'isPublish',
        render: (_: string, record: Topping) => {
            return (
                <Tag color={`${record.isPublish ? 'green' : 'red'}`}>
                    {record?.isPublish ? 'Publish' : 'Draft'}
                </Tag>
            );
        },
    },
];

const Toppings = () => {
    const { user } = useAuthStore();
    const [filterForm] = Form.useForm();
    const [form] = Form.useForm();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [currentTopping, setCurrentTopping] = useState<Topping | null>(null);
    const [queryParams, setQueryParams] = useState({
        limit: PER_PAGE,
        page: 1,
        tenantId: user!.tenant?.id,
    });
    const {
        token: { colorBgLayout },
    } = theme.useToken();

    useEffect(() => {
        if (currentTopping) {
            setDrawerOpen(true);
            form.setFieldsValue(currentTopping);
        }
    }, [currentTopping]);

    const {
        data: toppings,
        isFetching,
        isError,
        error,
    } = useQuery({
        queryKey: ['toppings', queryParams],
        queryFn: async () => {
            const filterParams = Object.fromEntries(
                Object.entries(queryParams).filter((item) => !!item[1])
            );
            const queryString = new URLSearchParams(
                filterParams as unknown as Record<string, string>
            ).toString();
            return getToppings(queryString).then((res) => res.data);
        },
        placeholderData: keepPreviousData,
    });

    const queryClient = useQueryClient();
    const { mutate: toppingMutate, isPending } = useMutation({
        mutationKey: ['topping'],
        mutationFn: async (data: FormData) => {
            if (currentTopping) {
                // edit mode
                return updateTopping(data, currentTopping._id).then(
                    (res) => res.data
                );
            } else {
                // create mode
                return createTopping(data).then((res) => res.data);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['toppings'] });
            setDrawerOpen(false);
            form.resetFields();
            return;
        },
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

    console.log(toppings);

    const debouncedQUpdate = useMemo(() => {
        return debounce((value: string | undefined) => {
            setQueryParams((prev) => ({ ...prev, q: value, page: 1 }));
        }, 500);
    }, []);

    const handleToppingSubmit = async () => {
        await form.validateFields();
        try {
            const postData = {
                ...form.getFieldsValue(),
                tenantId:
                    user?.role === ROLES.ADMIN
                        ? form.getFieldValue('tenantId')
                        : user?.tenant?.id,
                image: form.getFieldValue('image'),
            };
            const formData = makeFormData(postData);
            await toppingMutate(formData);
        } catch (error) {
            if (error instanceof Error) {
                console.log({
                    errorMessage: error.message,
                    name: error.name,
                    stack: error.stack,
                });
            }
        }
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
                    <ToppingFilter>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setDrawerOpen(true)}>
                            Add Product
                        </Button>
                    </ToppingFilter>
                </Form>
                <Table
                    columns={[
                        ...columns,
                        {
                            title: 'Action',
                            dataIndex: 'action',
                            key: 'action',
                            render: (_, record: Topping) => {
                                return (
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            setCurrentTopping(record);
                                        }}>
                                        Edit
                                    </Button>
                                );
                            },
                        },
                    ]}
                    dataSource={toppings?.data}
                    rowKey={'id'}
                    pagination={{
                        total: toppings?.total,
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
                    title={currentTopping ? 'Update Product' : 'Add Product'}
                    open={drawerOpen}
                    styles={{ body: { background: colorBgLayout } }}
                    width={650}
                    onClose={() => {
                        setDrawerOpen(false);
                        form.resetFields();
                        setCurrentTopping(null);
                    }}
                    destroyOnClose={true}
                    extra={
                        <Space>
                            <Button
                                onClick={() => {
                                    setDrawerOpen(false);
                                    form.resetFields();
                                    setCurrentTopping(null);
                                }}>
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                onClick={handleToppingSubmit}
                                loading={isPending}>
                                Submit
                            </Button>
                        </Space>
                    }>
                    <Form layout="vertical" form={form}>
                        {/* <UserForm isEditMode={!!currentEditingUser} /> */}
                        <ToppingForm form={form} />
                    </Form>
                </Drawer>
            </Space>
        </>
    );
};

export default Toppings;
