import React, { Component } from 'react';
import { Form, Input, Button, Table, Modal } from 'antd';
import http from '../../http';

class TeachersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Nombre',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Identificación',
          dataIndex: 'id',
          key: 'id',
        },
      ],
      teachers: [],
      loading: false,
      visible: false,
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  componentDidMount() {
    this.getTeachers();
  }

  handleOk = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        http
          .post('participant/profesor', {
            nombre: values.name,
            id: values.id,
          })
          .then(data => {
            this.getTeachers();
          })
          .catch(err => {
            console.log('error ' + err);
          });
        this.props.form.resetFields();
        this.setState({
          modalNewStudent: false,
        });
      }
    });
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  getTeachers() {
    http.get('participant/profesor').then(res => {
      let data = res.data.data;
      let teachers = [];
      let count = 0;
      data.forEach(reg => {
        teachers.push({
          key: count,
          name: reg.nombre,
          id: reg.id,
        });
        count += 1;
      });
      this.setState({
        teachers,
      });
    });
  }

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
        <Table dataSource={this.state.teachers} columns={this.state.columns} bordered />;
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
            </Button>,
          ]}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="Nombre">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Nombre es requerido!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Identificación">
              {getFieldDecorator('id', {
                rules: [{ required: true, message: 'Identificación es requerida!' }],
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
