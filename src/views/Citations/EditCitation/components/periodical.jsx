import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { TextField } from '@material-ui/core';

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

class Periodical extends Component {

  constructor(props) {
    super(props);
    this.state = {
      periodical: props.periodical,
      error: null
    };
  }

  onChange(path, value) {
    let periodical = this.state.periodical;
    _.set(periodical, path, this.fromViewValue(value));
    this.setState({ periodical });
  }

  fromViewValue(value) {
    return value || null;
  }

  render() {
    const { classes, periodical } = this.props;
    return (
      <form autoComplete="off" noValidate>
        <div className={classes.field}>
          <TextField
            className={classes.textField}
            label="Title"
            margin="dense"
            required
            value={periodical.attributes.title || ''}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.title', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Author"
            margin="dense"
            value={periodical.attributes.author || ''}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.author', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Volume/Issue"
            margin="dense"
            value={periodical.attributes.issue || ''}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.issue', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Date"
            margin="dense"
            value={periodical.attributes.issueDate || ''}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.issueDate', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Place"
            margin="dense"
            value={periodical.attributes.place || ''}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.place', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Url"
            margin="dense"
            value={periodical.attributes.url || ''}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.url', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Url Accessed Date"
            margin="dense"
            value={periodical.attributes.urlAccessedAt || ''}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.urlAccessedAt', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Page/Column"
            margin="dense"
            value={periodical.attributes.page || ''}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.page', event.target.value)}
          />
        </div>
      </form>
    );
  }
}

Periodical.propTypes = {
  classes: PropTypes.object.isRequired,
  periodical: PropTypes.object
};

Periodical.defaultProps = {
  periodical: {
    attributes: {},
    relationships: {}
  }
};

export default withStyles(styles)(Periodical);
