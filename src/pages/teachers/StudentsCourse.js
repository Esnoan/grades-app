import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Row, Col, Typography, Form, Modal, Select, Input } from 'antd';
import http from '../../http';

const { Title } = Typography;
const { Option } = Select;

class StudentsCoursePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Nombre',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Corte 1',
          dataIndex: 'gradeOne',
          key: 'gradeOne',
        },
        {
          title: 'Corte 2',
          dataIndex: 'gradeTwo',
          key: 'gradeTwo',
        },
        {
          title: 'Corte 3',
          dataIndex: 'gradeThree',
          key: 'gradeThree',
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
              Calificar
            </Button>
          ),
        },
      ],
      dataSource: [
        {
          key: '1',
          id: 'A001',
          name: 'Estudiante 1',
          gradeOne: '5',
          gradeTwo: '5',
          gradeThree: '5',
        },
      ],
      teacherId: props.match.params.teacherId,
      courseId: props.match.params.courseId,
      visible: false,
      loading: false,
      studentId: '',
    };
  }

  componentDidMount() {
    http.get('asset/materia').then(res => {
      let subjects = res.data.data.filter(
        subject =>
          subject.nombre === this.state.courseId && subject.profesor === this.state.teacherId,
      );
      let dataSource = [];
      let key = 0;
      subjects.forEach(element => {
        let name = this.getStudentName(element.estudiante);
        dataSource.push({
          key,
          id: element.estudiante,
          name,
          gradeOne: element.corte1 === '' ? '-' : element.corte1,
          gradeTwo: element.corte2 === '' ? '-' : element.corte2,
          gradeThree: element.corte3 === '' ? '-' : element.corte3,
        });
      });
      this.setState({ dataSource });
    });
  }

  getStudentName(id) {
    let name = '';
    http.get('participant/estudiante').then(res => {
      let array = res.data.data.filter(student => student.id === id);
      name = array[0].nombre;
    });
    return name;
  }

  onRegisterCourse = (key, e) => {
    e.preventDefault();
    this.setState({
      studentId: key,
      visible: true,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  handleRegisterGrade = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Corte ', values.gradeNumber);
        console.log('Nota ', values.grade);
        this.props.form.resetFields();
        this.setState({
          visible: false,
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, loading } = this.state;
    return (
      <div>
        <Row>
          <Col span={24}>
            <Link to={`/teachers/${this.state.teacherId}/courses/`}>Volver atras</Link>
            <Title style={{ marginTop: '10px' }} level={3}>
              Lista de estudiantes de {this.state.courseId}
            </Title>
          </Col>
          <Col span={24}>
            <Table dataSource={this.state.dataSource} columns={this.state.columns} bordered />
          </Col>
        </Row>
        <Modal
          title="Matricular Materia"
          visible={visible}
          onOk={this.handleRegisterGrade}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancelar
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleRegisterGrade}
            >
              Guardar
            </Button>,
          ]}
        >
          <Form>
            <Form.Item label="Estudiante">
              {getFieldDecorator('id', {
                initialValue: this.state.studentId,
                rules: [{ required: true, message: 'Ingrese una nota' }],
              })(<Input disabled type="text" />)}
            </Form.Item>
            <Form.Item label="Corte">
              {getFieldDecorator('gradeNumber', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor seleccione el corte al cual pertenece la calificación',
                  },
                ],
              })(
                <Select mode="single">
                  <Option key={1} value="gradeOne">
                    Corte 1
                  </Option>
                  <Option key={1} value="gradeTwo">
                    Corte 2
                  </Option>
                  <Option key={1} value="gradeThree">
                    Corte 3
                  </Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="Nota">
              {getFieldDecorator('grade', {
                rules: [{ required: true, message: 'Ingrese una nota' }],
              })(<Input type="number" />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(StudentsCoursePage);
