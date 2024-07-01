import { Button, Card, Checkbox, Flex, Form, Input, Layout, Space } from 'antd';
import { LockFilled, UserOutlined, LockOutlined } from '@ant-design/icons';
import Icon from '../../components/icon/Icon';

const LoginPage = () => {
    return (
        <>
            {/* <h1>Sign in</h1>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Log in</button>
            <label htmlFor="remember-me">Remember me </label>
            <input type="checkbox" id="remember-me" />
            <a href="#">Forget password</a> */}
            <Layout
                style={{
                    height: '100vh',
                    display: 'grid',
                    placeItems: 'center',
                }}>
                <Space direction="vertical" align="center">
                    <Layout.Content
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Icon />
                    </Layout.Content>
                    <Card
                        bordered={false}
                        style={{ width: '350px' }}
                        title={
                            <Space
                                style={{
                                    width: '100%',
                                    fontSize: 16,
                                    justifyContent: 'center',
                                }}>
                                <LockFilled />
                                Sign in
                            </Space>
                        }>
                        <Form autoComplete="off">
                            <Form.Item
                                name={'Username'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Email is not valid',
                                    },
                                ]}>
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder="Username"
                                />
                            </Form.Item>
                            <Form.Item
                                name={'Password'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password',
                                    },
                                ]}>
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Flex justify="space-between">
                                <Form.Item name={'remember'}>
                                    <Checkbox checked={true}>
                                        Remember me
                                    </Checkbox>
                                </Form.Item>
                                <a href="#" id="login-form-id">
                                    Forget password
                                </a>
                            </Flex>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ width: '100%' }}>
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Space>
            </Layout>
        </>
    );
};

export default LoginPage;
