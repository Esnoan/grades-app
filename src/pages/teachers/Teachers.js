import React, { Component } from 'react';
import { Form, Input, Button, Table, Modal } from 'antd';

class TeachersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Nombre',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'Identificación',
          dataIndex: 'id',
          key: 'id'
        }
      ],
      dataSource: [
        {
          key: '1',
          name: 'Mike',
          id: 32
        },
        {
          key: '2',
          name: 'John',
          id: 42
        },
        {
          key: '12',
          name: 'Mike',
          id: 32
        },
        {
          key: '23',
          name: 'John',
          id: 42
        },
        {
          key: '14',
          name: 'Mike',
          id: 32
        },
        {
          key: '52',
          name: 'John',
          id: 42
        },
        {
          key: '16',
          name: 'Mike',
          id: 32
        },
        {
          key: '72',
          name: 'John',
          id: 42
        },
        {
          key: '81',
          name: 'Mike',
          id: 32
        },
        {
          key: '92',
          name: 'John',
          id: 42
        },
        {
          key: '811',
          name: 'Mike',
          id: 32
        },
        {
          key: '912',
          name: 'John',
          id: 42
        }
      ],
      loading: false,
      visible: false
    };
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, loading } = this.state;
    return (
      <div>
        <Button
          type="primary"
          onClick={this.showModal}
          style={{ float: 'right', marginBottom: '20px' }}
        >
          Nuevo
        </Button>
        <br />
        <Table dataSource={this.state.dataSource} columns={this.state.columns} bordered />;
        <Modal
          title="Nuevo profesor"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancelar
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Guardar
            </Button>
          ]}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="Nombre">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Nombre es requerido!' }]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Identificación">
              {getFieldDecorator('id', {
                rules: [{ required: true, message: 'Identificación es requerida!' }]
              })(<Input type="number" />)}
            </Form.Item>
            <br />
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(TeachersPage);
