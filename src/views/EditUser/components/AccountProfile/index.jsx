import moment from 'moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { Avatar, Typography, Button, LinearProgress } from '@material-ui/core';
import { Portlet, PortletContent, PortletFooter } from 'components';
import { getInitials } from 'helpers';
import styles from './styles';

class AccountProfile extends Component {
  render() {
    const { classes, className, user, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet {...rest} className={rootClassName}>
        <PortletContent>
          <div className={classes.details}>
            <div className={classes.info}>
              <Typography variant="h2">{user.attributes.firstName} {user.attributes.lastName}</Typography>
              <Typography className={classes.subtitle} variant="body1">{user.relationships.roles.join(', ')}</Typography>
              <Typography className={classes.subtitle2} variant="body1">Added {moment(user.attributes.createdAt).format('DD MMM YYYY')}</Typography>
            </div>
            <Avatar className={classes.avatar} src={user.attributes.avatarUrl}>
              {getInitials(`${user.attributes.firstName} ${user.attributes.lastName}`)}
            </Avatar>
          </div>
          <div className={classes.progressWrapper}>
            <Typography variant="body1">Profile Completeness: 70%</Typography>
            <LinearProgress value={70} variant="determinate"/>
          </div>
        </PortletContent>
        <PortletFooter>
          {user.attributes.isActive ?
            <Button variant="text">Deactivate</Button> :
            <Button color="primary" variant="text">Re-activate</Button>
          }
        </PortletFooter>
      </Portlet>
    );
  }
}

AccountProfile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountProfile);
