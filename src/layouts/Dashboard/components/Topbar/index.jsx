import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import api from 'services/api';
import { state as appState } from 'App';

// Externals
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Badge,
  IconButton,
  Popover,
  Toolbar,
  Typography
} from '@material-ui/core';

// Material icons
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  NotificationsOutlined as NotificationsIcon,
  Input as InputIcon
} from '@material-ui/icons';

// Shared services
import { getNotifications } from 'services/notification';

// Custom components
import { NotificationList } from './components';

// Component styles
import styles from './styles';

// Service methods
const signOut = async () => {
  let response = await api.put('auth/logout');
  if (!response.ok) {
    throw 'Logout failed';
  }
  return await response.json();
};


class Topbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: appState.get('user'),
      isEditMode: appState.get('isEditMode'),
      notifications: [],
      notificationsLimit: 4,
      notificationsCount: 0,
      notificationsEl: null
    }
  }
  signal = true;

  async getNotifications() {
    try {
      const { notificationsLimit } = this.state;

      const { notifications, notificationsCount } = await getNotifications(
        notificationsLimit
      );

      if (this.signal) {
        this.setState({
          notifications,
          notificationsCount
        });
      }
    } catch (error) {
      return;
    }
  }

  componentDidMount() {
    this.signal = true;
    this.getNotifications();
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

  handleSignOut = async () => {
    const { history } = this.props;
    try {
      await signOut();
    } catch {

    }
    appState.set('user', null);
    history.push('/sign-in');
  };

  handleShowNotifications = event => {
    this.setState({
      notificationsEl: event.currentTarget
    });
  };

  handleCloseNotifications = () => {
    this.setState({
      notificationsEl: null
    });
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
    const { notifications, notificationsCount, notificationsEl } = this.state;

    const rootClassName = classNames(classes.root, className);
    const showNotifications = Boolean(notificationsEl);

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
            <IconButton
              className={`${classes.rightButton}`}
              onClick={this.handleShowNotifications}
            >
              <Badge
                badgeContent={notificationsCount}
                color="primary"
                variant="dot"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            {this.state.user ?
              (<IconButton
                className={`${classes.rightButton}`}
                onClick={this.handleSignOut}
              >
                <InputIcon />
              </IconButton>)
              : ''
            }
          </Toolbar>
        </div>
        <Popover
          anchorEl={notificationsEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          onClose={this.handleCloseNotifications}
          open={showNotifications}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <NotificationList
            notifications={notifications}
            onSelect={this.handleCloseNotifications}
          />
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
