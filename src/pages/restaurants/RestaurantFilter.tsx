import { Card, Flex, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { UsersFilterProps } from '../../types';

const RestaurantFilter = ({ onFilterChange, children }: UsersFilterProps) => {
    return (
        <Card bordered={false}>
            <Flex gap={10} justify="space-between" align="center">
                <Input
                    style={{ width: 300 }}
                    placeholder="Search"
                    prefix={<SearchOutlined />}
                    onChange={(e) =>
                        onFilterChange('userSearchQuery', e.target.value)
                    }
                />
                {children}
            </Flex>
        </Card>
    );
};

export default RestaurantFilter;
