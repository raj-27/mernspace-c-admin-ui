import {
    Avatar,
    Card,
    Col,
    Flex,
    List,
    Row,
    Skeleton,
    Space,
    Statistic,
    Tag,
    Typography,
} from 'antd';
import { useAuthStore } from '../store';
import Icon from '@ant-design/icons';
import { BarChartIcon } from '../components/icon/BarChart';
import { ComponentType } from 'react';
import { BagIcon } from '../components/icon/BagIcon';

const { Title } = Typography;
const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0' };

interface CardTitleProps {
    title: string;
    PrefixIcon: ComponentType<unknown>;
}

const CardTitle = ({ title, PrefixIcon }: CardTitleProps) => {
    return (
        <Space>
            <Icon component={PrefixIcon} />
            {title}
        </Space>
    );
};

const list = [
    {
        OrderSummary: 'Peperoni, Margarita ...',
        address: 'Bandra, Mumbai',
        amount: 1200,
        status: 'preparing',
        loading: false,
    },
    {
        OrderSummary: 'Paneer, Chicken BBQ ...',
        address: 'Balurghat, West bengal',
        amount: 2000,
        status: 'on the way',
        loading: false,
    },
    {
        OrderSummary: 'Paneer, Chicken BBQ ...',
        address: 'Balurghat, West bengal',
        amount: 2000,
        status: 'on the way',
        loading: false,
    },
    {
        OrderSummary: 'Paneer, Chicken BBQ ...',
        address: 'Balurghat, West bengal',
        amount: 2000,
        status: 'on the way',
        loading: false,
    },
    {
        OrderSummary: 'Paneer, Chicken BBQ ...',
        address: 'Balurghat, West bengal',
        amount: 2000,
        status: 'on the way',
        loading: false,
    },
    {
        OrderSummary: 'Paneer, Chicken BBQ ...',
        address: 'Balurghat, West bengal',
        amount: 2000,
        status: 'on the way',
        loading: false,
    },
];
const HomePage = () => {
    const { user } = useAuthStore();

    return (
        <div>
            <Title level={5}>Welcom,{user?.firstName}</Title>

            <Row className="mt-4" gutter={16}>
                <Col className="gutter-row" span={12}>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Card bordered={false}>
                                <Flex gap={10}>
                                    <BagIcon />
                                    <Statistic
                                        title="Total Orders"
                                        value={52}
                                    />
                                </Flex>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card bordered={false}>
                                <Flex gap={10}>
                                    <BarChartIcon />
                                    <Statistic
                                        title="Total Sale"
                                        value={70000}
                                        precision={2}
                                        prefix="₹"
                                    />
                                </Flex>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card
                                title={
                                    <Flex justify="space-between">
                                        <CardTitle
                                            title="Sales"
                                            PrefixIcon={BarChartIcon}
                                        />
                                        <Flex gap={10}>
                                            <Avatar>D</Avatar>
                                            <Avatar
                                                style={{
                                                    backgroundColor: '#fde3cf',
                                                    color: '#f56a00',
                                                }}>
                                                M
                                            </Avatar>
                                            <Avatar>Y</Avatar>
                                        </Flex>
                                    </Flex>
                                }
                                bordered={false}></Card>
                        </Col>
                    </Row>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Card
                        bordered={false}
                        title={
                            <CardTitle
                                title="Recent Orders"
                                PrefixIcon={BagIcon}
                            />
                        }>
                        <List
                            className="demo-loadmore-list"
                            loading={false}
                            itemLayout="horizontal"
                            loadMore={false}
                            dataSource={list}
                            renderItem={(item) => (
                                <List.Item>
                                    <Skeleton
                                        avatar
                                        title={false}
                                        loading={item.loading}
                                        active>
                                        <List.Item.Meta
                                            title={
                                                <a href="https://ant.design">
                                                    {item.OrderSummary}
                                                </a>
                                            }
                                            description={item.address}
                                        />
                                        <Row
                                            style={{ flex: 1 }}
                                            justify="space-between">
                                            <Col>
                                                <Typography.Text strong>
                                                    ₹{item.amount}
                                                </Typography.Text>
                                            </Col>
                                            <Col>
                                                <Tag color="volcano">
                                                    {item.status}
                                                </Tag>
                                            </Col>
                                        </Row>
                                    </Skeleton>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default HomePage;
