import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Grid, CircularProgress } from '@material-ui/core';
import { Dashboard as DashboardLayout } from 'layouts';
import { AccountProfile, AccountDetails } from './components';
import service from 'services/users';

const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  },
  progressWrapper: {
    padding: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  },
});

class AddUser extends Component {
  signal = true;

  state = {
    isLoading: true,
    user: null,
    error: null
  };

  async getUser() {
    try {
      this.setState({ isLoading: true });

      const user = {
        userRoles: []
      };

      const roles = await service.getRoles();

      if (this.signal) {
        this.setState({
          isLoading: false,
          user,
          roles
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

  componentWillMount() {
    this.signal = true;
    this.getUser();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  async save() {
    try {
      await service.createUser(this.state.user);
      this.props.history.push(`/users`);
    } catch(err) {
      alert(`Error: ${err}`);
    }
  }

  render() {
    const { classes } = this.props;
    const { user, roles, isLoading } = this.state;

    if (isLoading) {
      return (
        <DashboardLayout>
          <div className={classes.progressWrapper}>
            <CircularProgress />
          </div>
        </DashboardLayout>
      );
    }

    return (
      <DashboardLayout title="Edit User">
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item lg={8} md={6} xl={8} xs={12}>
              <AccountDetails user={user} roles={roles} onSave={this.save.bind(this)} />
            </Grid>
          </Grid>
        </div>
      </DashboardLayout>
    );
  }
}

AddUser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddUser);
