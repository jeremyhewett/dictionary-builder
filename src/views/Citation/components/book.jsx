import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Grid, Typography, TextField, Button, FormControl, InputLabel, Paper, Tab, Tabs } from '@material-ui/core';

import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from 'components';

let styles = theme => ({
  field: {
    margin: theme.spacing(3)
  },
  textField: {
    width: '420px',
    maxWidth: '100%',
    marginRight: theme.spacing(3)
  },
});

class Book extends Component {

  constructor(props) {
    super(props);
    this.state = {
      book: props.book,
      error: null
    };
  }

  onChange(path, value) {
    let book = this.state.book;
    _.set(book, path, this.fromViewValue(value));
    this.setState({ book });
  }

  fromViewValue(value) {
    return value || null;
  }

  render() {
    const { classes, book } = this.props;
    return (
      <form autoComplete="off" noValidate>
        <div className={classes.field}>
          <TextField
            className={classes.textField}
            label="Title"
            margin="dense"
            required
            value={book.attributes.title || ''}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.title', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Author"
            margin="dense"
            value={book.attributes.author || ''}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.author', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Year published"
            margin="dense"
            value={book.attributes.yearPublished || ''}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.yearPublished', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Year composed"
            margin="dense"
            value={book.attributes.yearComposed || ''}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.yearComposed', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Publisher"
            margin="dense"
            value={book.attributes.publisher || ''}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.publisher', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Place"
            margin="dense"
            value={book.attributes.place || ''}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.place', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Editor"
            margin="dense"
            value={book.attributes.editor || ''}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.editor', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Url"
            margin="dense"
            value={book.attributes.url || ''}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.url', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Url Accessed Date"
            margin="dense"
            value={book.attributes.urlAccessedAt || ''}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.urlAccessedAt', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Page/Column"
            margin="dense"
            value={book.attributes.page || ''}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.page', event.target.value)}
          />
        </div>
      </form>
    );
  }
}

Book.propTypes = {
  classes: PropTypes.object.isRequired,
  book: PropTypes.object
};

Book.defaultProps = {
  book: {
    attributes: {},
    relationships: {}
  }
};

export default withStyles(styles)(Book);
