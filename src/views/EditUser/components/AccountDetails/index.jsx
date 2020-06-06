import _ from 'lodash';
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles, Checkbox } from '@material-ui/core';
import { Button, TextField, Typography } from '@material-ui/core';
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from 'components';

import styles from './styles';

class AccountDetails extends Component {
  state = {
    user: this.props.user,
    roles: this.props.roles
  };

  onChange(path, value) {
    let user = this.state.user;
    _.set(user, path, value);
    this.setState({ user });
  }

  setRole(role, enabled) {
    let user = this.state.user;
    let hasRole = user.userRoles.some(ur => ur.role.id === role.id);
    if (hasRole !== enabled) {
      if (enabled) {
        user.userRoles = user.userRoles.concat([{ role }]);
      } else {
        user.userRoles = user.userRoles.filter(ur => ur.role.id !== role.id);
      }
      this.setState({ user });
    }
  }

  render() {
    const { classes, className, onSave, ...rest } = this.props;
    const { user, roles } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet {...rest} className={rootClassName}>
        <PortletHeader>
          <PortletLabel title="Details"/>
        </PortletHeader>
        <PortletContent noPadding>
          <form autoComplete="off" noValidate>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="First name"
                margin="dense"
                required
                value={user.firstName || ''}
                onChange={(event) => this.onChange('firstName', event.target.value || null)}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Last name"
                margin="dense"
                required
                value={user.lastName || ''}
                onChange={(event) => this.onChange('lastName', event.target.value || null)}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Email Address"
                margin="dense"
                required
                value={user.email || ''}
                onChange={(event) => this.onChange('email', event.target.value || null)}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Password"
                margin="dense"
                value={user.password || ''}
                onChange={(event) => this.onChange('password', event.target.value || null)}
                variant="outlined"
              />
            </div>
            {roles.map((role) => (
              <div className={classes.checkboxField} key={role.id}>
                <Checkbox
                  checked={user.userRoles.some(ur => ur.role.id === role.id)}
                  onChange={event => this.setRole(role, event.target.checked)}
                  color="primary"
                  id={`${role.name}-role-input`}
                />
                <label htmlFor={`${role.name}-role-input`}><Typography variant="body1">{role.name}</Typography></label>
              </div>
            ))}
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button onClick={onSave} color="primary" variant="contained">Save details</Button>
        </PortletFooter>
      </Portlet>
    );
  }
}

AccountDetails.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
  onSave: PropTypes.func
};

export default withStyles(styles)(AccountDetails);
