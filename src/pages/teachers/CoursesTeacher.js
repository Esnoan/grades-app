import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Table, Row, Col, Typography } from 'antd';

const { Title } = Typography;

class CoursesTeacherPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: 'Materia',
          dataIndex: 'course',
          key: 'course'
        },
        {
          title: 'Estudiantes',
          dataIndex: 'count',
          key: 'count'
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
              Ver
            </Button>
          )
        }
      ],
      dataSource: [
        {
          key: '1',
          id: 'A001',
          course: 'Curso 1',
          count: 32
        },
        {
          key: '2',
          id: 'A002',
          course: 'Curso 12',
          count: 42
        },
        {
          key: '12',
          id: 'A003',
          course: 'Curso 13',
          count: 32
        }
      ],
      teacherId: props.match.params.teacherId
    };
  }

  onRegisterCourse = (key, e) => {
    e.preventDefault();
    this.props.history.push(`/teachers/${this.state.teacherId}/courses/${key}/students`);
  };

  render() {
    return (
      <div>
        <Row>
          <Col span={24}>
            <Title level={3}>Cursos de {this.state.teacherId}</Title>
          </Col>
          <Col span={24}>
            <Table dataSource={this.state.dataSource} columns={this.state.columns} bordered />
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(CoursesTeacherPage);
