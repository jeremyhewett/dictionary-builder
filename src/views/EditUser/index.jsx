import _ from 'lodash';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles, Checkbox } from '@material-ui/core';
import { CircularProgress, Grid, Typography, TextField, Button } from '@material-ui/core';
import { Dashboard as DashboardLayout } from 'layouts';
import service from 'services/users';

import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from 'components';

import styles from './styles';

class EditUser extends Component {
  signal = true;

  state = {
    isLoading: false,
    isNew: !this.props.match.params.userId,
    user: null,
    error: null
  };

  async getUser() {
    try {
      this.setState({ isLoading: true });

      const user = this.state.isNew ?
        {
          attributes: {},
          relationships: {
            roles: []
          }
        }
        : await service.getUser(this.props.match.params.userId);

      if (this.signal) {
        this.setState({
          isLoading: false,
          user
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

  renderTitle() {
    const { classes } = this.props;
    const { user, isNew } = this.state;

    return (
      <div>
        <Typography className={classes.title} variant="h4">{user.id ? 'Edit' : 'Create'} User</Typography>
        {isNew ? '' : <Typography className={classes.subtitle} variant="body2">ID {user.id}</Typography>}
      </div>
    );
  }

  onChange(path, value) {
    let user = this.state.user;
    _.set(user, path, value);
    this.setState({ user });
  }

  setRole(role, enabled) {
    let user = this.state.user;
    let hasRole = user.relationships.roles.includes(role);
    if (hasRole !== enabled) {
      if (enabled) {
        user.relationships.roles = user.relationships.roles.concat([role]);
      } else {
        user.relationships.roles = user.relationships.roles.filter(r => r !== role);
      }
      this.setState({ user });
    }
  }

  async save() {
    try {
      if (this.state.isNew) {
        await service.createUser(this.state.user);
      } else {
        await service.updateUser(this.state.user);
      }
      this.props.history.push(`/users`);
    } catch(err) {
      alert(`Error: ${err}`);
    }
  }

  renderDetailsForm() {
    const { classes } = this.props;
    const { user } = this.state;

    return (
      <Portlet>
        <PortletHeader>
          <PortletLabel title="Details" />
        </PortletHeader>
        <PortletContent noPadding>
          <form autoComplete="off" noValidate>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="First name"
                margin="dense"
                required
                value={user.attributes.firstName || ''}
                variant="outlined"
                onChange={(event) => this.onChange('attributes.firstName', event.target.value || null)}
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Last name"
                margin="dense"
                required
                value={user.attributes.lastName || ''}
                variant="outlined"
                onChange={(event) => this.onChange('attributes.lastName', event.target.value || null)}
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Email"
                margin="dense"
                required
                value={user.attributes.email || ''}
                variant="outlined"
                onChange={(event) => this.onChange('attributes.email', event.target.value || null)}
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Password"
                margin="dense"
                required
                value={user.attributes.password || ''}
                variant="outlined"
                onChange={(event) => this.onChange('attributes.password', event.target.value || null)}
              />
            </div>
          </form>
        </PortletContent>
      </Portlet>
    );
  }

  renderRolesForm() {
    const { classes } = this.props;
    const { user } = this.state;

    return (
      <Portlet>
        <PortletHeader>
          <PortletLabel title="Roles" />
        </PortletHeader>
        <PortletContent noPadding>
          <form autoComplete="off" noValidate>
            <div className={classes.checkboxField}>
              <Checkbox
                checked={user.relationships.roles.includes('admin')}
                onChange={event => this.setRole('admin', event.target.checked)}
                color="primary"
                id="admin-role-input"
              />
              <label for="admin-role-input"><Typography variant="body1">Admin</Typography></label>
            </div>
            <div className={classes.checkboxField}>
              <Checkbox
                checked={user.relationships.roles.includes('editor')}
                onChange={event => this.setRole('editor', event.target.checked)}
                color="primary"
                id="editor-role-input"
              />
              <label for="editor-role-input"><Typography variant="body1">Editor</Typography></label>
            </div>
            <div className={classes.checkboxField}>
              <Checkbox
                checked={user.relationships.roles.includes('reviewer')}
                onChange={event => this.setRole('reviewer', event.target.checked)}
                color="primary"
                id="reviewer-role-input"
              />
              <label for="reviewer-role-input"><Typography variant="body1">Reviewer</Typography></label>
            </div>
          </form>
        </PortletContent>
      </Portlet>
    );
  }

  render() {
    const { classes } = this.props;
    const { isLoading } = this.state;

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
      <DashboardLayout title={this.renderTitle()}>
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item lg={7} md={7} xl={7} xs={12}>
              {this.renderDetailsForm()}
            </Grid>
            <Grid item lg={5} md={5} xl={5} xs={12}>
              {this.renderRolesForm()}
            </Grid>
          </Grid>
          <div className={classes.row}>
            <Button
              color="primary"
              variant="contained"
              className={classes.saveButton}
              onClick={this.save.bind(this)}
            >Save</Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }
}

EditUser.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(EditUser);
