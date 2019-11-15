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
  state = { user: this.props.user };

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

  render() {
    const { classes, className, onSave, ...rest } = this.props;
    const { user } = this.state;

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
                helperText="Please specify the first name"
                label="First name"
                margin="dense"
                required
                value={user.attributes.firstName || ''}
                onChange={(event) => this.onChange('attributes.firstName', event.target.value || null)}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Last name"
                margin="dense"
                required
                value={user.attributes.lastName || ''}
                onChange={(event) => this.onChange('attributes.lastName', event.target.value || null)}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Email Address"
                margin="dense"
                required
                value={user.attributes.email || ''}
                onChange={(event) => this.onChange('attributes.email', event.target.value || null)}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Password"
                margin="dense"
                value={user.attributes.password || ''}
                onChange={(event) => this.onChange('attributes.password', event.target.value || null)}
                variant="outlined"
              />
            </div>
            <div className={classes.checkboxField}>
              <Checkbox
                checked={user.relationships.roles.includes('admin')}
                onChange={event => this.setRole('admin', event.target.checked)}
                color="primary"
                id="admin-role-input"
              />
              <label htmlFor="admin-role-input"><Typography variant="body1">Admin</Typography></label>
            </div>
            <div className={classes.checkboxField}>
              <Checkbox
                checked={user.relationships.roles.includes('editor')}
                onChange={event => this.setRole('editor', event.target.checked)}
                color="primary"
                id="editor-role-input"
              />
              <label htmlFor="editor-role-input"><Typography variant="body1">Editor</Typography></label>
            </div>
            <div className={classes.checkboxField}>
              <Checkbox
                checked={user.relationships.roles.includes('reviewer')}
                onChange={event => this.setRole('reviewer', event.target.checked)}
                color="primary"
                id="reviewer-role-input"
              />
              <label htmlFor="reviewer-role-input"><Typography variant="body1">Reviewer</Typography></label>
            </div>
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
  onSave: PropTypes.func
};

export default withStyles(styles)(AccountDetails);
