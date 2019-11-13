import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Table, Row, Col, Typography } from 'antd';
import http from '../../http';
import courses from '../../courses';

const { Title } = Typography;

Array.prototype.unique = (function(a) {
  return function() {
    return this.filter(a);
  };
})(function(a, b, c) {
  return c.indexOf(a, b + 1) < 0;
});

class CoursesTeacherPage extends Component {
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
          title: 'Materia',
          dataIndex: 'course',
          key: 'course',
        },
        {
          title: 'Estudiantes',
          dataIndex: 'count',
          key: 'count',
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
          ),
        },
      ],
      dataSource: [],
      teacherId: props.match.params.teacherId,
      name: '',
    };
  }

  getCourses() {
    http.get('asset/materia').then(res => {
      let subjects = res.data.data;
      let subjectsTeacher = [];
      let ids = [];
      subjects.forEach(element => {
        if (element.profesor === this.state.teacherId) {
          subjectsTeacher.push({
            id: element.id,
            course: element.nombre,
          });
          ids.push(element.nombre);
        }
      });
      let newIds = ids.unique();

      let final = [];
      let key = 0;
      newIds.forEach(element => {
        let count = 0;
        subjectsTeacher.forEach(subject => {
          if (element === subject.course) {
            count += 1;
          }
        });
        final.push({
          key,
          id: element,
          course: this.findCourse(element),
          count,
        });
        key += 1;
      });
      this.setState({
        dataSource: final,
      });
    });
  }

  componentDidMount() {
    this.getCourses();
    http.get(`participant/profesor`).then(res => {
      let array = res.data.data;
      array.filter(teacher => teacher.id === this.state.teacherId);

      this.setState({
        name: array[0].nombre,
      });
    });
  }

  findCourse(id) {
    let course = courses.filter(x => x.id === id);
    return course[0].name;
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
            <Title level={3}>Cursos de {this.state.name}</Title>
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
