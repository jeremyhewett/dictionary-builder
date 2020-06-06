import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import ApaCitation from './ApaCitation';

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

class EditSource extends Component {

  constructor(props) {
    super(props);
    this.state = {
      source: props.source,
      error: null
    };
  }

  onChange(path, value) {
    let source = this.state.source;
    _.set(source, path, this.fromViewValue(value));
    this.setState({ source });
  }

  fromViewValue(value) {
    return value || null;
  }

  render() {
    const { classes, source } = this.props;

    return (
      <form autoComplete="off" noValidate>
        <div className={classes.field}>
          <TextField
            className={classes.textField}
            label="Title"
            margin="dense"
            required
            value={source.titleOfPublication || ''}
            variant="outlined"
            onChange={(event) => this.onChange('titleOfPublication', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Author (surname)"
            margin="dense"
            value={source.author.surname || ''}
            variant="outlined"
            onChange={(event) => this.onChange('author.surname', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Author (forenames)"
            margin="dense"
            value={source.author.forenames || ''}
            variant="outlined"
            onChange={(event) => this.onChange('author.forenames', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Year published"
            margin="dense"
            value={source.datePublished || ''}
            variant="outlined"
            onChange={(event) => this.onChange('datePublished', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Publisher"
            margin="dense"
            value={source.publisher || ''}
            variant="outlined"
            onChange={(event) => this.onChange('publisher', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Title of Publication"
            margin="dense"
            value={source.titleOfPublication || ''}
            variant="outlined"
            onChange={(event) => this.onChange('titleOfPublication', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Place"
            margin="dense"
            value={source.location || ''}
            variant="outlined"
            onChange={(event) => this.onChange('location', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Editor"
            margin="dense"
            value={source.editor || ''}
            variant="outlined"
            onChange={(event) => this.onChange('editor', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Url"
            margin="dense"
            value={source.url || ''}
            variant="outlined"
            onChange={(event) => this.onChange('url', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Url Accessed Date"
            margin="dense"
            value={source.urlAccessedAt || ''}
            variant="outlined"
            onChange={(event) => this.onChange('urlAccessedAt', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Page/Column"
            margin="dense"
            value={source.page || ''}
            variant="outlined"
            onChange={(event) => this.onChange('page', event.target.value)}
          />
        </div>
        <div className={classes.field}>
          <ApaCitation source={source}/>
        </div>
      </form>
    );
  }
}

EditSource.propTypes = {
  classes: PropTypes.object.isRequired,
  source: PropTypes.object
};

EditSource.defaultProps = {};

export default withStyles(styles)(EditSource);
