import {
    Alert,
    Button,
    Card,
    Checkbox,
    Flex,
    Form,
    Input,
    Layout,
    Space,
} from 'antd';
import { LockFilled, UserOutlined, LockOutlined } from '@ant-design/icons';
import Icon from '../../components/icon/Icon';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Credentials } from '../../types';
import { login, self } from '../../http/api';
import { useAuthStore } from '../../store';

const loginUser = async (credential: Credentials) => {
    const data = await login(credential);
    return data;
};

const getSelf = async () => {
    const { data } = await self();
    return data;
};

const LoginPage = () => {
    const { setUser } = useAuthStore();
    const { refetch } = useQuery({
        queryKey: ['self'],
        queryFn: getSelf,
        enabled: false,
    });
    const { mutate, isPending, isError } = useMutation({
        mutationKey: ['login'],
        mutationFn: loginUser,
        onSuccess: async () => {
            const selfData = await refetch();
            setUser(selfData.data);
        },
    });

    return (
        <>
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
                        <Form
                            autoComplete="off"
                            onFinish={(value) =>
                                mutate({
                                    email: value.username,
                                    password: value.password,
                                })
                            }>
                            {isError && (
                                <Alert
                                    style={{ margin: '1rem 0 ' }}
                                    type="error"
                                    message={`Error`}
                                />
                            )}
                            <Form.Item
                                name={'username'}
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
                                name={'password'}
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
                                    style={{ width: '100%' }}
                                    disabled={isPending}
                                    loading={isPending}>
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
