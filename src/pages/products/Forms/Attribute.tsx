import { Card, Col, Form, Radio, Row, Switch, Typography } from 'antd';
import { PricingProp } from '../../../types';

const Attribute = ({ selectedCategory }: PricingProp) => {
    if (!selectedCategory) {
        return;
    }
    return (
        <Card
            title={<Typography.Text>Attribute</Typography.Text>}
            bordered={false}>
            {selectedCategory.attributes.map((attribute) => {
                return (
                    <div key={attribute.name}>
                        {attribute.widgetType === 'radio' ? (
                            <Form.Item
                                label={attribute.name}
                                name={['attributes', attribute.name]}
                                initialValue={attribute.defaultValue}
                                rules={[
                                    {
                                        required: true,
                                        message: `${attribute.name} is required`,
                                    },
                                ]}>
                                <Radio.Group>
                                    {attribute.availableOptions.map(
                                        (option) => (
                                            <Radio.Button
                                                value={option}
                                                key={option}>
                                                {option}
                                            </Radio.Button>
                                        )
                                    )}
                                </Radio.Group>
                            </Form.Item>
                        ) : attribute.widgetType === 'switch' ? (
                            <Row>
                                <Col>
                                    <Form.Item
                                        label={`${attribute.name}`}
                                        name={['attributes', attribute.name]}
                                        initialValue={attribute.defaultValue}
                                        valuePropName="checked">
                                        <Switch
                                            checkedChildren="Yes"
                                            unCheckedChildren="No"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        ) : null}
                    </div>
                );
            })}
        </Card>
    );
};

export default Attribute;
