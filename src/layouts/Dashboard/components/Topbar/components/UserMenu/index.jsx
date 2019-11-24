import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

// Component styles
import styles from './styles';

class UserMenu extends Component {
  render() {
    const { className, classes, items, onSelect } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.content}>
          <List component="div">
            {items.map(item => (
              <Link key={item.id} to="#">
                <ListItem className={classes.listItem} component="div" onClick={() => onSelect(item)}>
                  <ListItemIcon className={classes.listItemIcon} style={{ color: item.color }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} classes={{ secondary: classes.listItemTextSecondary }}/>
                </ListItem>
                {item === items[items.length - 1] ? '' : <Divider />}
              </Link>
            ))}
          </List>
        </div>
      </div>
    );
  }
}

UserMenu.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  onSelect: PropTypes.func
};

UserMenu.defaultProps = {
  items: [],
  onSelect: () => {}
};

export default withStyles(styles)(UserMenu);
