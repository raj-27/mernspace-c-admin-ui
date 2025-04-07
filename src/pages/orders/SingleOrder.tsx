import { Avatar, Breadcrumb, Card, Col, Flex, List, Row, Select, Space, Tag, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';
import { colourMapping } from '../../constants';
import { capitalizeFirst } from '../products/helper';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { changeStatus, getSingleOrder } from '../../http/api';
import { CartItem, Order, OrderStatus } from '../../types';

const orderStausOptons = [
    { value: 'recieved', label: 'Recieved' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'prepared', label: 'Prepared' },
    { value: 'out_for_delivery', label: 'Out For Delivery' },
    { value: 'delivered', label: 'Delivered' },
];

const SingleOrder = () => {
    const params = useParams();
    const orderId = params.orderId;
    const { data: order } = useQuery<Order>({
        queryKey: ['order', orderId],
        queryFn: async () => {
            const queryString = new URLSearchParams({
                fields: 'cart,address,paymentMode,tenantId,totalAmount,comment,orderStatus,createdAt',
            }).toString();
            return getSingleOrder(orderId as string, queryString).then((res) => res.data);
        },
    });

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationKey: ['order', orderId],
        mutationFn: async (data: { status: OrderStatus }) => {
            return changeStatus(orderId as string, data).then((res) => res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['order', orderId] });
        },
    });

    if (!order) {
        return <div>Loading...</div>;
    }
    console.log(order);

    const handleOrdeStatusChange = (status: OrderStatus) => {
        console.log('changeto', status);
        mutate({ status });
    };
    return (
        <Space direction="vertical" size={'large'} style={{ width: '100%' }}>
            <Flex justify="space-between" align="center">
                <Breadcrumb
                    separator={<RightOutlined />}
                    items={[
                        { title: <Link to={'/'}>Dashboard</Link> },
                        { title: <Link to={'/orders'}>Orders</Link> },
                        { title: `Order ${order?._id}` },
                    ]}
                />
                <Space>
                    <Typography.Text>Change Order Staus</Typography.Text>
                    <Select
                        defaultValue={order.orderStatus}
                        style={{ width: 150 }}
                        onChange={handleOrdeStatusChange}
                        options={orderStausOptons}
                    />
                </Space>
            </Flex>
            <Row gutter={24}>
                <Col span={14}>
                    <Card
                        title="Order Details"
                        extra={
                            <Tag bordered={false} color={colourMapping[order.orderStatus] ?? 'processing'}>
                                {capitalizeFirst(order.orderStatus)}
                            </Tag>
                        }>
                        <List
                            dataSource={order.cart}
                            renderItem={(item: CartItem) => (
                                <List.Item key={item._id}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.image} />}
                                        title={item.name}
                                        description={item.qty}
                                    />
                                    <Space size={'large'}>
                                        <Typography.Text>
                                            {Object.values(item.chosenConfiguration.priceConfiguration).join(' ,')}
                                        </Typography.Text>
                                        <Typography.Text>
                                            {item.qty} Item{item.qty > 1 ? 's' : null}
                                        </Typography.Text>
                                    </Space>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={10}>
                    <Card title="Customer Details">
                        <Space direction="vertical">
                            <Flex style={{ flexDirection: 'column' }}>
                                <Typography.Text type="secondary">Name</Typography.Text>
                                <Typography.Text>
                                    {order?.customerId?.firstName + ' ' + order?.customerId?.lastName}
                                </Typography.Text>
                            </Flex>
                            <Flex style={{ flexDirection: 'column' }}>
                                <Typography.Text type="secondary">Addres</Typography.Text>
                                <Typography.Text>{order.address}</Typography.Text>
                            </Flex>
                            <Flex style={{ flexDirection: 'column' }}>
                                <Typography.Text type="secondary">Payment Method</Typography.Text>
                                <Typography.Text>{order.paymentMode.toLocaleUpperCase()}</Typography.Text>
                            </Flex>
                            <Flex style={{ flexDirection: 'column' }}>
                                <Typography.Text type="secondary">Payment Status</Typography.Text>
                                <Typography.Text>{capitalizeFirst(order.orderStatus)}</Typography.Text>
                            </Flex>
                            <Flex style={{ flexDirection: 'column' }}>
                                <Typography.Text type="secondary">Order Amount</Typography.Text>
                                <Typography.Text>💵{order.totalAmount}</Typography.Text>
                            </Flex>
                            <Flex style={{ flexDirection: 'column' }}>
                                <Typography.Text type="secondary">Order Time</Typography.Text>
                                <Typography.Text>{order.createdAt}</Typography.Text>
                            </Flex>
                            {order.comment && (
                                <Flex style={{ flexDirection: 'column' }}>
                                    <Typography.Text type="secondary">Order Comment</Typography.Text>
                                    <Typography.Text>{order.comment}</Typography.Text>
                                </Flex>
                            )}
                        </Space>
                    </Card>
                </Col>
            </Row>
        </Space>
    );
};

export default SingleOrder;
