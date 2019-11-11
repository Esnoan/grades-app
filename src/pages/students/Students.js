import React, { Component } from 'react';
import { Form, Input, Button, Table, Modal, Select } from 'antd';

import courses from './../../courses';

const { Option, OptGroup } = Select;

class StudentsPage extends Component {
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
        },
        {
          title: 'Opciones',
          key: 'action',
          render: (text, record) => (
            <Button
              type="primary"
              size="small"
              onClick={e => {
                this.onRegisterCourse(record.id, e);
              }}
            >
              Matricular materia
            </Button>
          )
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
        }
      ],
      loading: false,
      modalNewStudent: false,
      modalRegisterCourse: false,
      studentSelected: '',
      modeStudent: true,
      teachers: [
        {
          name: 'Profesor 1',
          id: '123456789'
        },
        {
          name: 'Profesor 2',
          id: '1234567890'
        }
      ]
    };
  }

  showModal = () => {
    this.setState({
      modalNewStudent: true
    });
  };

  onRegisterCourse = (key, e) => {
    e.preventDefault();
    this.setState({
      modalRegisterCourse: true,
      studentSelected: key,
      modeStudent: false
    });
  };

  handleSaveStudent = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Nombre ', values.name);
        console.log('ID ', values.id);
        this.props.form.resetFields();
        this.setState({
          modalNewStudent: false
        });
      }
    });
  };

  handleRegisterCourse = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Profesor ', values.teacher);
        console.log('Curso ', values.course);
        this.props.form.resetFields();
        this.setState({
          modalRegisterCourse: false
        });
      }
    });
  };

  handleCancel = e => {
    this.setState({
      modalNewStudent: false,
      modalRegisterCourse: false
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { modalNewStudent, loading, modalRegisterCourse, modeStudent } = this.state;

    const coursesList = courses
      .filter(course => course.type === 'course')
      .map((course, index) => {
        return (
          <Option key={course.id} value={course.id}>
            {course.name}
          </Option>
        );
      });

    const subjectList = courses
      .filter(course => course.type === 'subject')
      .map((course, index) => {
        return (
          <Option key={course.id} value={course.id}>
            {course.name}
          </Option>
        );
      });

    const teachersList = this.state.teachers.map((teacher, index) => {
      return (
        <Option key={index} value={teacher.id}>
          {teacher.name}
        </Option>
      );
    });

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
          title="Nuevo estudiante"
          visible={modalNewStudent}
          onOk={this.handleSaveStudent}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancelar
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleSaveStudent}>
              Guardar
            </Button>
          ]}
        >
          <Form>
            <Form.Item label="Nombre">
              {getFieldDecorator('name', {
                rules: [{ required: modeStudent, message: 'Nombre es requerido!' }]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Identificación">
              {getFieldDecorator('id', {
                rules: [{ required: modeStudent, message: 'Identificación es requerida!' }]
              })(<Input type="number" />)}
            </Form.Item>
            <br />
          </Form>
        </Modal>
        {/* Modal 2 */}
        <Modal
          title="Matricular Materia"
          visible={modalRegisterCourse}
          onOk={this.handleRegisterCourse}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancelar
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleRegisterCourse}
            >
              Guardar
            </Button>
          ]}
        >
          <Form>
            <Form.Item label="Materia a matricular">
              {getFieldDecorator('course', {
                rules: [
                  {
                    required: !modeStudent,
                    message: 'Por favor selecciona una materia o curso'
                  }
                ]
              })(
                <Select mode="single">
                  <OptGroup label="Materias">{subjectList}</OptGroup>
                  <OptGroup label="Cursos">{coursesList}</OptGroup>
                </Select>
              )}
            </Form.Item>
            <br />
            <Form.Item label="Profesor">
              {getFieldDecorator('teacher', {
                rules: [
                  {
                    required: !modeStudent,
                    message: 'Por favor seleccione un profesor'
                  }
                ]
              })(<Select mode="single">{teachersList}</Select>)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(StudentsPage);
