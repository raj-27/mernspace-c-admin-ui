import { Card, Col, Form, Input, Row } from 'antd';

const UserForm = () => {
    return (
        <Row>
            <Col span={24}>
                <Card title="Basic info">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="First name" name="firstname">
                                <Input type="text" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Last name" name="lastname">
                                <Input type="text" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="First Name">
                                <Input type="text" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Last Name">
                                <Input type="text" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};

export default UserForm;
