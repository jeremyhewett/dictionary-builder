import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import api from 'services/api';
import { state as appState } from 'App';
import { getInitials } from 'helpers';
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import {
  Avatar,
  IconButton,
  Popover,
  Toolbar,
  Typography
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Input as InputIcon
} from '@material-ui/icons';

import { UserMenu } from './components';
import styles from './styles';

// Service methods
const service = {
  signOut: () => {
    return api.put('auth/logout');
  }
};

class Topbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: appState.get('user'),
      isEditMode: appState.get('isEditMode'),
      userMenuItems: [
        {
          id: 'logout',
          title: 'Logout',
          icon: <InputIcon />
        }
      ],
      userMenuEl: null
    }
  }
  signal = true;

  componentDidMount() {
    this.signal = true;
  }

  componentWillMount() {
    let unwatchEditMode = appState.watch('isEditMode', isEditMode => this.setState({ isEditMode }));
    let unwatchUser = appState.watch('user', user => {
      this.setState({ user });
    });
    this._unwatch = () => {
      unwatchEditMode();
      unwatchUser();
    };
  }

  componentWillUnmount() {
    this._unwatch();
    this.signal = false;
  }

  signOut = async () => {
    const { history } = this.props;
    try {
      await service.signOut();
      appState.set('user', null);
      history.push('/sign-in');
    } catch(err) {
      alert(`Error: ${err}`);
    }
  };

  showUserMenu = event => {
    this.setState({
      userMenuEl: event.currentTarget
    });
  };

  closeUserMenu = () => {
    this.setState({
      userMenuEl: null
    });
  };

  handleUserMenuAction = (item) => {
    this.setState({
      userMenuEl: null
    });
    if (item.id === 'logout') {
      this.signOut();
    }
  };

  canEdit() {
    return this.state.user && this.state.user.attributes.roles.includes('editor');
  }

  toggleEditMode() {
    appState.set('isEditMode', !appState.get('isEditMode'));
  }

  render() {
    const {
      classes,
      className,
      title,
      isSidebarOpen,
      onToggleSidebar
    } = this.props;
    const { user, userMenuItems, userMenuEl } = this.state;

    const rootClassName = classNames(classes.root, className);
    const isUserMenuOpen = Boolean(userMenuEl);

    return (
      <Fragment>
        <div className={rootClassName}>
          <Toolbar className={classes.toolbar}>
            {isSidebarOpen ? '' : (<IconButton
              className={classes.menuButton}
              onClick={onToggleSidebar}
              variant="text"
            >
              {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>)}
            {typeof title === 'string' ? (<Typography
              className={classes.title}
              variant="h4"
            >
              {title}
            </Typography>) : title}
            <span className={classes.rightSpacer} />
            {this.canEdit() ? (
              <IconButton
                className={`${classes.rightButton} ${this.state.isEditMode ? classes.editButtonActive : ''}`}
                onClick={this.toggleEditMode.bind(this)}
              >
                <EditIcon />
              </IconButton>)
              : ''
            }
            {this.state.user ?
              <IconButton className={`${classes.rightButton}`} onClick={this.showUserMenu}>
                <Avatar alt="" className={classes.avatar}>
                  {getInitials(`${user.attributes.firstName} ${user.attributes.lastName}`)}
                </Avatar>
              </IconButton>
              : ''
            }
          </Toolbar>
        </div>
        <Popover
          anchorEl={userMenuEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          onClose={this.closeUserMenu}
          open={isUserMenuOpen}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <UserMenu items={userMenuItems} onSelect={this.handleUserMenuAction}/>
        </Popover>
      </Fragment>
    );
  }
}

Topbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isSidebarOpen: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

Topbar.defaultProps = {
  onToggleSidebar: () => {}
};

export default compose(
  withRouter,
  withStyles(styles)
)(Topbar);
