import { Card, Col, Form, Input, Row } from 'antd';

const RestaurantForm = () => {
    return (
        <Row>
            <Col span={24}>
                <Card title="Tenant Information">
                    <Row gutter={20}>
                        <Col span={12}>
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Tenant name is required',
                                    },
                                ]}>
                                <Input placeholder="Enter tenant name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Address"
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Tenant Address is Required',
                                    },
                                ]}>
                                <Input placeholder="Enter tenant address" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};

export default RestaurantForm;
