import {
    Card,
    Col,
    Form,
    Input,
    Row,
    Select,
    Space,
    Switch,
    Typography,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { ROLES } from '../../constants';
import { getTenants } from '../../http/api';
import { useAuthStore } from '../../store';
import { Tenant } from '../../types';

type ToppingFilterProps = {
    children?: React.ReactNode;
};

const ToppingFilter = ({ children }: ToppingFilterProps) => {
    const { user } = useAuthStore();
    const { data: restaurants } = useQuery({
        queryKey: ['restaurants'],
        queryFn: () => {
            if (user!.role === ROLES.ADMIN) {
                return getTenants();
            }
            return;
        },
    });
    return (
        <Card>
            <Row>
                <Col span={16}>
                    <Row gutter={10}>
                        <Col span={6}>
                            <Form.Item name="q">
                                <Input
                                    placeholder="Search"
                                    prefix={<SearchOutlined />}
                                />
                            </Form.Item>
                        </Col>

                        {user!.role === ROLES.ADMIN && (
                            <Col span={6}>
                                <Form.Item name="tenantId">
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="Select Restaurent"
                                        allowClear={true}>
                                        {restaurants?.data?.data?.map(
                                            (restaurant: Tenant) => {
                                                return (
                                                    <Select.Option
                                                        key={restaurant.id}
                                                        value={restaurant.id}>
                                                        {restaurant.name}
                                                    </Select.Option>
                                                );
                                            }
                                        )}
                                    </Select>
                                </Form.Item>
                            </Col>
                        )}

                        <Col span={6}>
                            <Space>
                                <Form.Item name="isPublish">
                                    <Switch onChange={() => {}} />
                                </Form.Item>
                                <Typography.Text
                                    style={{
                                        marginBottom: 21,
                                        display: 'inline-block',
                                    }}>
                                    Show only publish
                                </Typography.Text>
                            </Space>
                        </Col>
                    </Row>
                </Col>
                <Col
                    span={8}
                    style={{
                        display: 'flex',
                        justifyContent: 'end',
                    }}>
                    {children}
                </Col>
            </Row>
        </Card>
    );
};

export default ToppingFilter;
