import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { CircularProgress, Typography } from '@material-ui/core';
import { Dashboard as DashboardLayout } from 'layouts';
import service from 'services/users';
import { UsersToolbar, UsersTable } from './components';
import styles from './style';

class UserList extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 10,
    users: [],
    selectedUsers: [],
    searchString: '',
    error: null
  };

  async getUsers() {
    try {
      this.setState({
        isLoading: true,
        users: [],
        selectedUsers: []
      });

      const { limit } = this.state;

      const users = await service.getUsers(0, limit);

      if (this.signal) {
        this.setState({
          isLoading: false,
          users
        });
      }
    } catch (error) {
      if (this.signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  }

  componentDidMount() {
    this.signal = true;
    this.getUsers();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  onSearchChange(searchString) {
    this.setState({ searchString });
  }

  handleSelect = selectedUsers => {
    this.setState({ selectedUsers });
  };

  async deleteUsers() {
    let selectedUsers = this.state.selectedUsers.map(userId => this.state.users.find(user => user.id === userId));
    await Promise.all(selectedUsers.map(user => service.deleteUser(user)));
    this.getUsers();
  }

  renderUsers() {
    const { classes } = this.props;
    const { isLoading, users, error, searchString } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (error) {
      return <Typography variant="h6">{error}</Typography>;
    }

    let visibleUsers = searchString ?
      users.filter(user => `${user.attributes.firstName} ${user.attributes.lastName}`.toLowerCase().includes(searchString.toLowerCase()) || user.attributes.email.toLowerCase().includes(searchString.toLowerCase())) :
      users;
    if (visibleUsers.length === 0) {
      return <Typography variant="h6">There are no users</Typography>;
    }

    return (
      <UsersTable onSelect={this.handleSelect} users={visibleUsers} />
    );
  }

  render() {
    const { classes } = this.props;
    const { selectedUsers } = this.state;

    return (
      <DashboardLayout title="Users">
        <div className={classes.root}>
          <UsersToolbar selectedUsers={selectedUsers} onDeleteUsers={this.deleteUsers.bind(this)} onSearchChange={this.onSearchChange.bind(this)}/>
          <div className={classes.content}>{this.renderUsers()}</div>
        </div>
      </DashboardLayout>
    );
  }
}

UserList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserList);
