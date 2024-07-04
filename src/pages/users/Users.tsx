import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const Users = () => {
    return (
        <div>
            <Breadcrumb
                items={[
                    {
                        title: <Link to={'/'}>Dashboard</Link>,
                    },
                    { title: 'Users' },
                ]}
            />
        </div>
    );
};

export default Users;
