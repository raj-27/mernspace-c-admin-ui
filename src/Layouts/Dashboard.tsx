import { NavLink, Navigate, Outlet } from 'react-router-dom';
import Icon from '@ant-design/icons';
import { useAuthStore } from '../store';
import { Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import Logo from '../components/icon/Logo';
import UserIcon from '../components/icon/UserIcon';
import Home from '../components/icon/Home';
import { foodIcon } from '../components/icon/FoodIcon';
import GiftIcon from '../components/icon/GiftIcon';
import BasketIcon from '../components/icon/BasketIcon';
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
    const [collapsed, setCollapsed] = useState(false);
    const { user } = useAuthStore();

    const {
        token: { colorBgContainer, borderRadiusLG },
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
                        style={{ padding: 0, background: colorBgContainer }}
                    />
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
