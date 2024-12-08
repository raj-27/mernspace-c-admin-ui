import {
    Card,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Space,
    Typography,
} from 'antd';
import { Category } from '../../../types';

type PricingProp = {
    selectedCategory: Category;
};
const Pricing = ({ selectedCategory }: PricingProp) => {
    if (!selectedCategory) {
        return null;
    }
    return (
        <Card
            title={<Typography.Text>Product Price</Typography.Text>}
            bordered={false}>
            {Object.entries(selectedCategory?.priceConfiguration).map(
                ([configKey, configValue]) => {
                    return (
                        <div key={configKey}>
                            <Space
                                direction="vertical"
                                size="large"
                                style={{ width: '100%' }}>
                                <Typography.Text>
                                    {`${configKey} (${configValue.priceType})`}
                                </Typography.Text>
                                <Row gutter={20}>
                                    {configValue.availableOptions.map(
                                        (option: string) => {
                                            return (
                                                <Col span={8} key={option}>
                                                    <Form.Item
                                                        label={option}
                                                        name={[
                                                            'priceConfig',
                                                            JSON.stringify({
                                                                configKey,
                                                                priceType:
                                                                    configValue.priceType,
                                                            }),
                                                            option,
                                                        ]}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: `${option} is required`,
                                                            },
                                                        ]}>
                                                        <InputNumber addonAfter="₹" />
                                                    </Form.Item>
                                                </Col>
                                            );
                                        }
                                    )}
                                </Row>
                            </Space>
                        </div>
                    );
                }
            )}
        </Card>
    );
};

export default Pricing;
