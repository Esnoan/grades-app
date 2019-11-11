import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu } from 'antd';

class NavBar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      current: 'home'
    };
  }

  componentDidMount() {
    this.setState({
      current: this.props.history.location.pathname.substring(
        1,
        this.props.history.location.pathname.length
      )
    });
  }

  handleClick = e => {
    this.setState({
      current: e.key
    });
    this.props.history.push(`/${e.key}`);
  };

  render() {
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="home">Inicio</Menu.Item>
        <Menu.Item key="teachers">Profesores</Menu.Item>
        <Menu.Item key="students">Estudiantes</Menu.Item>
        {/* <Menu.Item key="courses">Cursos</Menu.Item> */}
      </Menu>
    );
  }
}

export default withRouter(NavBar);
