import { NavLink, Navigate, Outlet } from 'react-router-dom';
import Icon, { BellOutlined } from '@ant-design/icons';
import { useAuthStore } from '../store';
import {
    Avatar,
    Badge,
    Dropdown,
    Flex,
    Layout,
    Menu,
    Space,
    theme,
} from 'antd';
import { useState } from 'react';
import Logo from '../components/icon/Logo';
import UserIcon from '../components/icon/UserIcon';
import Home from '../components/icon/Home';
import { foodIcon } from '../components/icon/FoodIcon';
import GiftIcon from '../components/icon/GiftIcon';
import BasketIcon from '../components/icon/BasketIcon';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../http/api';
import toast from 'react-hot-toast';
const { Sider, Content, Header, Footer } = Layout;

const items = [
    {
        key: '/',
        icon: <Icon component={Home} />,
        label: <NavLink to="/">Home</NavLink>,
    },
    {
        key: '/users',
        icon: <Icon component={UserIcon} />,
        label: <NavLink to="/users">Users</NavLink>,
    },
    {
        key: '/restaurants',
        icon: <Icon component={foodIcon} />,
        label: <NavLink to="/restaurants">Restaurants</NavLink>,
    },
    {
        key: '/products',
        icon: <Icon component={BasketIcon} />,
        label: <NavLink to="/products">Products</NavLink>,
    },
    {
        key: '/promos',
        icon: <Icon component={GiftIcon} />,
        label: <NavLink to="/promos">Promos</NavLink>,
    },
];

const Dashboard = () => {
    const { logout: logoutFromStore } = useAuthStore();
    const { mutate: logoutMutate } = useMutation({
        mutationKey: ['logout'],
        mutationFn: logout,
        onSuccess: async () => {
            logoutFromStore();
            toast.success('Successfully logout!');
            return;
        },
    });
    const [collapsed, setCollapsed] = useState(false);
    const { user } = useAuthStore();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    if (user === null) {
        return <Navigate to="/auth/login" replace={true} />;
    }
    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    theme="light"
                    onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical">
                        <Logo />
                    </div>
                    <Menu
                        theme="light"
                        defaultSelectedKeys={['/']}
                        mode="inline"
                        items={items}
                    />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: '0 16px',
                            background: colorBgContainer,
                        }}>
                        <Flex
                            gap="middle"
                            align="start"
                            justify="space-between">
                            <Badge
                                text={user?.tenant?.name ?? 'Global'}
                                status="success"
                            />
                            <Space size={16}>
                                <Badge dot>
                                    <BellOutlined />
                                </Badge>
                                <Dropdown
                                    menu={{
                                        items: [
                                            {
                                                key: 'logout',
                                                label: 'logout',
                                                onClick: () => logoutMutate(),
                                            },
                                        ],
                                    }}
                                    placement="bottomRight">
                                    <Avatar
                                        style={{
                                            backgroundColor: '#fde3cf',
                                            color: '#f56a00',
                                        }}>
                                        U
                                    </Avatar>
                                </Dropdown>
                            </Space>
                        </Flex>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Outlet />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Rambom Pizza Shop
                    </Footer>
                </Layout>
            </Layout>
        </div>
    );
};

export default Dashboard;
