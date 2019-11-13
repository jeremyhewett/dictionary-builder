import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import { Button, IconButton } from '@material-ui/core';
import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  Delete as DeleteIcon
} from '@material-ui/icons';
import { DisplayMode, SearchInput } from 'components';
import styles from './styles';

class UsersToolbar extends Component {
  addUser() {
    this.props.history.push('users/new');
  }

  render() {
    const { classes, className, selectedUsers } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <span className={classes.spacer} />
          {selectedUsers.length > 0 && (
            <IconButton className={classes.deleteButton} onClick={this.handleDeleteUsers}>
              <DeleteIcon />
            </IconButton>
          )}
          {/*<Button className={classes.importButton} size="small" variant="outlined" >
            <ArrowDownwardIcon className={classes.importIcon} /> Import
          </Button>
          <Button className={classes.exportButton} size="small" variant="outlined">
            <ArrowUpwardIcon className={classes.exportIcon} />Export</Button>*/}
          <Button onClick={this.addUser.bind(this)} color="primary" size="small" variant="outlined" >Add</Button>
        </div>
        <div className={classes.row}>
          <SearchInput className={classes.searchInput} placeholder="Search user" />
          <span className={classes.spacer} />
          <DisplayMode mode="list" />
        </div>
      </div>
    );
  }
}

UsersToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  selectedUsers: PropTypes.array,
  history: PropTypes.object.isRequired
};

UsersToolbar.defaultProps = {
  selectedUsers: []
};

export default compose(
  withRouter,
  withStyles(styles)
)(UsersToolbar);
