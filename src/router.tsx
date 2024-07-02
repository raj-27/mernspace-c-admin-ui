import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/login/login';
import Dashboard from './Layouts/Dashboard';
import UnAuth from './Layouts/UnAuth';
import Categories from './pages/Categories';
import Root from './Layouts/Root';

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
                        path: 'categories',
                        element: <Categories />,
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
