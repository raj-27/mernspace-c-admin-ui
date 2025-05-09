import { NavLink, Navigate, Outlet, useLocation } from 'react-router-dom';
import Icon, { BellOutlined } from '@ant-design/icons';
import { useAuthStore } from '../store';
import { Avatar, Badge, Dropdown, Flex, Layout, Menu, Space, Tag, theme } from 'antd';
import { useState } from 'react';
import Logo from '../components/icon/Logo';
import UserIcon from '../components/icon/UserIcon';
import Home from '../components/icon/Home';
import { foodIcon } from '../components/icon/FoodIcon';
import GiftIcon from '../components/icon/GiftIcon';
import BasketIcon from '../components/icon/BasketIcon';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../http/api';
import ToppingIcon from '../components/icon/ToppingIcon';
const { Sider, Content, Header, Footer } = Layout;

function getItems(role: string) {
    const baseItem = [
        {
            key: '/',
            icon: <Icon component={Home} />,
            label: <NavLink to="/">Home</NavLink>,
        },
        {
            key: '/products',
            icon: <Icon component={BasketIcon} />,
            label: <NavLink to="/products">Products</NavLink>,
        },
        {
            key: '/orders',
            icon: <Icon component={foodIcon} />,
            label: <NavLink to="/orders">Orders</NavLink>,
        },
        {
            key: '/toppings',
            icon: <Icon component={ToppingIcon} />,
            label: <NavLink to="/toppings">Toppings</NavLink>,
        },
        {
            key: '/promos',
            icon: <Icon component={GiftIcon} />,
            label: <NavLink to="/promos">Promos</NavLink>,
        },
    ];
    if (role === 'admin') {
        const menus = [...baseItem];
        menus.splice(1, 0, {
            key: '/users',
            icon: <Icon component={UserIcon} />,
            label: <NavLink to="/users">Users</NavLink>,
        });
        menus.splice(2, 0, {
            key: '/restaurants',
            icon: <Icon component={foodIcon} />,
            label: <NavLink to="/restaurants">Restaurants</NavLink>,
        });
        return menus;
    }
    return baseItem;
}

const Dashboard = () => {
    const location = useLocation();
    const { logout: logoutFromStore } = useAuthStore();
    const { mutate: logoutMutate } = useMutation({
        mutationKey: ['logout'],
        mutationFn: logout,
        onSuccess: async () => {
            logoutFromStore();
            return;
        },
    });
    const [collapsed, setCollapsed] = useState(false);
    const { user } = useAuthStore();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    if (user === null) {
        return <Navigate to={`/auth/login?returnTo=${location.pathname}`} replace={true} />;
    }
    const items = getItems(user?.role);
    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} theme="light" onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical">
                        <Logo />
                    </div>
                    <Menu theme="light" defaultSelectedKeys={[location.pathname]} mode="inline" items={items} />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: '0 16px',
                            background: colorBgContainer,
                        }}>
                        <Flex gap="middle" align="center" justify="space-between">
                            <Tag bordered={false} color="orange">
                                {user?.tenant?.name ?? 'You are admin'}
                            </Tag>
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
                                        {user?.firstName?.[0]}
                                    </Avatar>
                                </Dropdown>
                            </Space>
                        </Flex>
                    </Header>
                    <Content style={{ margin: 24 }}>
                        <Outlet />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Pizza Shop</Footer>
                </Layout>
            </Layout>
        </div>
    );
};

export default Dashboard;
