import { Outlet } from 'react-router-dom';

const UnAuth = () => {
    return (
        <div>
            <h1>No Auth Component</h1>
            <Outlet />
        </div>
    );
};

export default UnAuth;
