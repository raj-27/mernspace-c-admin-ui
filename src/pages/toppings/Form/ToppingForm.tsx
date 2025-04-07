import {
    Card,
    Col,
    Form,
    FormInstance,
    Input,
    Row,
    Select,
    Space,
    Switch,
    Typography,
} from 'antd';
import { useAuthStore } from '../../../store';
import { useQuery } from '@tanstack/react-query';
import { ROLES } from '../../../constants';
import { getTenants } from '../../../http/api';
import { Tenant } from '../../../types';
import ProductImage from '../../products/Forms/ProductImage';

const ToppingForm = ({ form }: { form: FormInstance }) => {
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
        <Row>
            <Col span={24}>
                <Card title="Topping info" style={{ margin: '1rem 0' }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Topping Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Topping name is required',
                                    },
                                ]}>
                                <Input type="text" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Topping Price"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Topping price is required',
                                    },
                                ]}>
                                <Input type="number" addonAfter="₹" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
                {/* Product Image */}
                <Card title="Product Image" style={{ margin: '1rem 0' }}>
                    <Row gutter={20}>
                        <Col span={12}>
                            <ProductImage
                                initialImage={form.getFieldValue('image')}
                            />
                        </Col>
                    </Row>
                </Card>

                {/* Tenant Info */}
                {user!.role === ROLES.ADMIN && (
                    <Card title="Tenant Info" style={{ margin: '1rem 0' }}>
                        <Row gutter={20}>
                            <Col span={24}>
                                <Form.Item
                                    label="Tenant Info"
                                    name="tenantId"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Tenant id is required',
                                        },
                                    ]}>
                                    <Select
                                        size="large"
                                        style={{ width: '100%' }}
                                        placeholder="Tenant id"
                                        allowClear={true}
                                        onChange={() => {}}>
                                        {restaurants?.data?.data?.map(
                                            (tenant: Tenant) => (
                                                <Select.Option
                                                    value={String(tenant.id)}
                                                    key={tenant.id}>
                                                    {tenant.name}
                                                </Select.Option>
                                            )
                                        )}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                )}

                {/* Other Property */}
                <Card title="Other Properties" style={{ margin: '1rem 0' }}>
                    <Row gutter={20}>
                        <Col span={24}>
                            <Space>
                                <Form.Item name="isPublish">
                                    <Switch
                                        checkedChildren="Yes"
                                        unCheckedChildren="No"
                                    />
                                </Form.Item>
                                <Typography.Text
                                    style={{
                                        marginBottom: 21,
                                        display: 'inline-block',
                                    }}>
                                    Publish
                                </Typography.Text>
                            </Space>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};

export default ToppingForm;
