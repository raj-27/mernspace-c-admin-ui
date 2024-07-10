import { Card, Flex, Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { UsersFilterProps } from '../../types';

const RestaurantFilter = ({ children }: UsersFilterProps) => {
    return (
        <Card bordered={false}>
            <Flex gap={10} justify="space-between" align="center">
                <Form.Item name="q">
                    <Input
                        style={{ width: 300 }}
                        placeholder="Search"
                        prefix={<SearchOutlined />}
                    />
                </Form.Item>
                {children}
            </Flex>
        </Card>
    );
};

export default RestaurantFilter;
