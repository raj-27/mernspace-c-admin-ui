import { Breadcrumb, Flex, Space, Table, Tag, Typography } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Order } from '../../types';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../../http/api';
import { colourMapping, ROLES } from '../../constants';
import { capitalizeFirst } from '../products/helper';
import React from 'react';
import socket from '../../lib/socket';
import { useAuthStore } from '../../store';

const columns = [
    {
        title: 'Order Id',
        dataIndex: '_id',
        key: '_id',
        render: (_text: string, record: Order) => {
            return <Typography.Text>{record._id}</Typography.Text>;
        },
    },
    {
        title: 'Customer',
        dataIndex: 'customer',
        key: 'customer._id',
        render: (_text: string, record: Order) => {
            return <Typography.Text>{record.customer.firstName + ' ' + record.customer.lastName}</Typography.Text>;
        },
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        render: (_text: string, record: Order) => {
            return <Typography.Text>{record.address}</Typography.Text>;
        },
    },
    {
        title: 'Comment',
        dataIndex: 'comment',
        key: 'comment',
        render: (_text: string, record: Order) => {
            return <Typography.Text>{record.comment}</Typography.Text>;
        },
    },
    {
        title: 'Payment Mode',
        dataIndex: 'paymentMode',
        key: 'paymentMode',
        render: (_text: string, record: Order) => {
            return <Typography.Text>{record.paymentMode}</Typography.Text>;
        },
    },
    {
        title: 'Order status',
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        render: (_text: string, record: Order) => {
            return (
                <Tag bordered={false} color={colourMapping[record.orderStatus]}>
                    {capitalizeFirst(record.orderStatus)}
                </Tag>
            );
        },
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render: (_text: string, record: Order) => {
            return <Typography.Text>💵{record.totalAmount}</Typography.Text>;
        },
    },
    {
        title: 'CreatedAt',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (_text: string, record: Order) => {
            return <Typography.Text>{record.createdAt}</Typography.Text>;
        },
    },
    {
        title: 'Action',
        render: (_: string, record: Order) => {
            return <Link to={`/orders/${record._id}`}>Details</Link>;
        },
    },
];
// Todo : make this dynamic
const TENANT_ID = 3;
const Orders = () => {
    const { user } = useAuthStore();
    React.useEffect(() => {
        if (user?.tenant && user.role === ROLES.MANAGER) {
            socket.on('order-update', (data) => {
                console.log('data-recieved: ', data);
            });
            socket.on('join', (data) => {
                console.log('user joined in:', data.roomId);
            });
            socket.emit('join', {
                tenantId: user.tenant.id,
            });
        }
        return () => {
            socket.off('join');
            socket.off('order-update');
            // socket.close();
        };
    }, []);
    const { data: orders } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            // if admin user then make sure to send tenant id ot tenant id from selected filter
            const queryString = new URLSearchParams({ tenantId: TENANT_ID.toString() }).toString();
            return getOrders('').then((res) => res.data);
        },
    });

    return (
        <Space direction="vertical" size={'large'} style={{ width: '100%' }}>
            <Flex justify="space-between" align="center">
                <Breadcrumb
                    separator={<RightOutlined />}
                    items={[{ title: <Link to={'/'}>Dashboard</Link> }, { title: 'Orders' }]}
                />
            </Flex>
            <Table columns={[...columns]} rowKey={'_id'} dataSource={orders?.data} />
        </Space>
    );
};

export default Orders;
