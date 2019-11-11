import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import { Layout, Breadcrumb } from 'antd';

import './App.css';

import HomePage from './pages/home/Home';
import TeachersPage from './pages/teachers/Teachers';
import StudentsPage from './pages/students/Students';
import CoursesTeacherPage from './pages/teachers/CoursesTeacher';
import StudentsCoursePage from './pages/teachers/StudentsCourse';

const { Header, Content, Footer } = Layout;
function App() {
  return (
    <Router>
      <div className="container">
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <NavBar />
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Inicio</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/home" exact component={HomePage} />
                <Route path="/teachers" exact component={TeachersPage} />
                <Route path="/students" exact component={StudentsPage} />
                <Route path="/teachers/:teacherId/courses" exact component={CoursesTeacherPage} />
                <Route
                  path="/teachers/:teacherId/courses/:courseId/students"
                  exact
                  component={StudentsCoursePage}
                />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Aplicación de Notas</Footer>
        </Layout>
      </div>
      <br />
    </Router>
  );
}

export default App;
