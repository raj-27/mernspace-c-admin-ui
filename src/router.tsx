import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/login/login';
import Dashboard from './Layouts/Dashboard';
import UnAuth from './Layouts/UnAuth';
import Root from './Layouts/Root';
import Users from './pages/users/Users';
import Restaurants from './pages/restaurants/Restaurants';
import Products from './pages/products/Products';
import Toppings from './pages/toppings/Toppings';
import Orders from './pages/orders/Orders';
import SingleOrder from './pages/orders/SingleOrder';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Dashboard />,
                children: [
                    {
                        path: '/',
                        element: <HomePage />,
                    },
                    {
                        path: '/users',
                        element: <Users />,
                    },
                    {
                        path: '/restaurants',
                        element: <Restaurants />,
                    },
                    {
                        path: '/products',
                        element: <Products />,
                    },
                    {
                        path: '/orders',
                        element: <Orders />,
                    },
                    {
                        path: '/orders/:orderId',
                        element: <SingleOrder />,
                    },
                    {
                        path: '/toppings',
                        element: <Toppings />,
                    },
                ],
            },
            {
                path: '/auth',
                element: <UnAuth />,
                children: [
                    {
                        path: 'login',
                        element: <LoginPage />,
                    },
                ],
            },
        ],
    },
]);
