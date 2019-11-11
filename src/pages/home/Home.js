import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Typography, Form, Input, Button } from 'antd';

const { Title } = Typography;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleRegisterCourse = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.history.push(`/teachers/${values.id}/courses/`);
      }
    });
    this.props.form.resetFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Row>
          <Col span={24}>
            <Title level={3}>Matricular curso a estudiante</Title>
            Ir a <Link to="/students">estudiantes</Link>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Title level={3}>Calificar curso</Title>
          </Col>
          <Col span={8}>
            <Form>
              <Form.Item label="Documento de identidad profesor">
                {getFieldDecorator('id', {
                  rules: [{ required: true, message: 'Documento de identidad requerido!' }]
                })(<Input />)}
              </Form.Item>
            </Form>
          </Col>
          <Col span={4}>
            <br />
            <br />
            <Button
              style={{ marginLeft: '5px' }}
              type="primary"
              onClick={e => {
                this.handleRegisterCourse(e);
              }}
            >
              Acceder
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(withRouter(HomePage));
