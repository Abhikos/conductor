import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux';

const menuPaths = {
  Workflow: [{
    label: 'All',
    href: '/workflow',
    icon: 'fa-circle-thin'
  },{
    label: 'Running',
    href: '/workflow?status=RUNNING',
    icon: 'fa-play-circle'
  },{
    label: 'Failed',
    href: '/workflow?status=FAILED&h=48',
    icon: 'fa-warning'
  },{
    label: 'Timed Out',
    href: '/workflow?status=TIMED_OUT&h=48',
    icon: 'fa-clock-o'
  },{
    label: 'Terminated',
    href: '/workflow?status=TERMINATED&h=48',
    icon: 'fa-ban'
  },{
    label: 'Completed',
    href: '/workflow?status=COMPLETED&h=48',
    icon: 'fa-bullseye'
  },{
    label: 'Workflow Defs',
    href: '/workflow/metadata',
    icon: 'fa-code-fork'
  },{
    label: 'Tasks',
    href: '/workflow/metadata/tasks',
    icon: 'fa-tasks'
  }]
};

const LeftMenu = React.createClass({

  getInitialState() {
    return {
      sys: {},
      minimize: false
    };
  },
  handleResize(e) {
    this.setState({windowWidth: window.innerWidth, minimize: window.innerWidth < 600});
  },

  componentDidMount() {
   window.addEventListener('resize', this.handleResize);
 },

 componentWillUnmount() {
   window.removeEventListener('resize', this.handleResize);
 },
  componentWillReceiveProps(nextProps) {
    this.state.loading = nextProps.fetching;
    this.state.version = nextProps.version;
    this.state.minimize = nextProps.minimize;
  },

  render() {
    let minimize = this.state.minimize;
    let appName = 'Workflow';
    const width = minimize?'50px':'176px';

    if (this.props.appName) {
      appName = this.props.appName;
    }
    let display = minimize?'none':'';
    let menuItems = [];
    menuPaths[appName].map((cv, i, arr) => {
      let iconClass = 'fa ' + cv['icon'];
      menuItems.push((
        <Link to={cv['href']}>
            <div className='menuItem'>
            <i className={iconClass} style={{width: '20px'}}></i>
            <span style={{ marginLeft: '10px', display: display}}>
              {cv['label']}
            </span>
            </div>
        </Link>
      ));
    });

    return (
      <div className="left-menu" style={{width:width}}>
        <div className="logo textual pull-left">
          <a href="/" title="Workflow">
            <h4><i className={this.state.loading?"fa fa-bars fa-spin fa-1x":"fa fa-bars"}></i> {this.state.loading || minimize?'':appName}</h4>
          </a>
        </div>
        <div className="menuList">
          {menuItems}
        </div>
        <div className="menu-footer">
          {this.state.version}
        </div>
      </div>
    );
  }

});

export default connect(state => state.workflow)(LeftMenu);
