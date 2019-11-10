import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import {withStyles} from '@material-ui/core';

// Material components
import {
  //Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  //ListSubheader,
  //Typography
} from '@material-ui/core';

// Material icons
import {
  HomeOutlined as HomeIcon,
  DashboardOutlined as DashboardIcon,
  PeopleOutlined as PeopleIcon,
  ShoppingBasketOutlined as ShoppingBasketIcon,
  LockOpenOutlined as LockOpenIcon,
  TextFields as TextFieldsIcon,
  ImageOutlined as ImageIcon,
  ListOutlined as EntriesIcon,
  AccountBoxOutlined as AccountBoxIcon,
  SettingsOutlined as SettingsIcon
} from '@material-ui/icons';

// Component styles
import styles from './styles';

const ReflessNavLink = React.forwardRef((props, ref) => (<NavLink {...props}/>));

class Sidebar extends Component {
  render() {
    const {classes, className} = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <nav className={rootClassName}>
        <div className={classes.logoWrapper}>
          <Link
            className={classes.logoLink}
            to="/"
          >
            <img
              alt="DCHP-2"
              className={classes.logoImage}
              src="/images/logos/dchp_logo.png"
            />
          </Link>
        </div>
        <Divider className={classes.logoDivider}/>
        {/*<div className={classes.profile}>
          <Link to="/account">
            <Avatar
              alt="Roman Kutepov"
              className={classes.avatar}
              src="/images/avatars/avatar_1.png"
            />
          </Link>
          <Typography
            className={classes.nameText}
            variant="h6"
          >
            Roman Kutepov
          </Typography>
          <Typography
            className={classes.bioText}
            variant="caption"
          >
            Brain Director
          </Typography>
        </div>
        <Divider className={classes.profileDivider} />*/}
        <List
          component="div"
          disablePadding
        >
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={ReflessNavLink}
            to="/home"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <HomeIcon/>
            </ListItemIcon>
            <ListItemText
              classes={{primary: classes.listItemText}}
              primary="Home"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={ReflessNavLink}
            to="/entries"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <EntriesIcon/>
            </ListItemIcon>
            <ListItemText
              classes={{primary: classes.listItemText}}
              primary="Entries"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={ReflessNavLink}
            to="/headwords"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <EntriesIcon/>
            </ListItemIcon>
            <ListItemText
              classes={{primary: classes.listItemText}}
              primary="Headwords"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={ReflessNavLink}
            to="/dashboard"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <DashboardIcon/>
            </ListItemIcon>
            <ListItemText
              classes={{primary: classes.listItemText}}
              primary="Dashboard"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={ReflessNavLink}
            to="/users"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <PeopleIcon/>
            </ListItemIcon>
            <ListItemText
              classes={{primary: classes.listItemText}}
              primary="Users"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={ReflessNavLink}
            to="/products"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <ShoppingBasketIcon/>
            </ListItemIcon>
            <ListItemText
              classes={{primary: classes.listItemText}}
              primary="Products"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={ReflessNavLink}
            to="/typography"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <TextFieldsIcon/>
            </ListItemIcon>
            <ListItemText
              classes={{primary: classes.listItemText}}
              primary="Typography"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={ReflessNavLink}
            to="/icons"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <ImageIcon/>
            </ListItemIcon>
            <ListItemText
              classes={{primary: classes.listItemText}}
              primary="Icons and Images"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={ReflessNavLink}
            to="/account"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <AccountBoxIcon/>
            </ListItemIcon>
            <ListItemText
              classes={{primary: classes.listItemText}}
              primary="Account"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={ReflessNavLink}
            to="/settings"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <SettingsIcon/>
            </ListItemIcon>
            <ListItemText
              classes={{primary: classes.listItemText}}
              primary="Settings"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={ReflessNavLink}
            to="/sign-in"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <LockOpenIcon/>
            </ListItemIcon>
            <ListItemText
              classes={{primary: classes.listItemText}}
              primary="Login"
            />
          </ListItem>

        </List>
        {/*<Divider className={classes.listDivider} />
        <List
          component="div"
          disablePadding
          subheader={
            <ListSubheader className={classes.listSubheader}>
              Support
            </ListSubheader>
          }
        >
          <ListItem
            className={classes.listItem}
            component="a"
            href="https://devias.io/contact-us"
            target="_blank"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Customer support"
            />
          </ListItem>
        </List>*/}
      </nav>
    );
  }
}

Sidebar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
