import { Breadcrumb, Flex, Space } from 'antd';
import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';

const SingleOrder = () => {
    return (
        <Space direction="vertical" size={'large'} style={{ width: '100%' }}>
            <Flex justify="space-between" align="center">
                <Breadcrumb
                    separator={<RightOutlined />}
                    items={[
                        { title: <Link to={'/'}>Dashboard</Link> },
                        { title: <Link to={'/orders'}>Orders</Link> },
                        { title: `Order ${151515}` },
                    ]}
                />
            </Flex>
            ;
        </Space>
    );
};

export default SingleOrder;
