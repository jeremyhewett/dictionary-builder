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

class Website extends Component {

  constructor(props) {
    super(props);
    this.state = {
      website: props.website,
      error: null
    };
  }

  onChange(path, value) {
    let website = this.state.website;
    _.set(website, path, this.fromViewValue(value));
    this.setState({ website });
  }

  fromViewValue(value) {
    return value === '' ? null : value;
  }

  render() {
    const { classes, website } = this.props;
    return (
      <form autoComplete="off" noValidate>
        <div className={classes.field}>
          <TextField
            className={classes.textField}
            label="Title"
            margin="dense"
            required
            value={website.attributes.title}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.title', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Author"
            margin="dense"
            value={website.attributes.author}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.author', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Published date"
            margin="dense"
            value={website.attributes.publishedDate}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.publishedDate', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Place"
            margin="dense"
            value={website.attributes.place}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.place', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Url"
            margin="dense"
            value={website.attributes.url}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.url', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Url Accessed Date"
            margin="dense"
            value={website.attributes.urlAccessedAt}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.urlAccessedAt', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Evidence of usage"
            margin="dense"
            value={website.attributes.evidence}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.evidence', event.target.value)}
          />
        </div>
      </form>
    );
  }
}

Website.propTypes = {
  classes: PropTypes.object.isRequired,
  website: PropTypes.object
};

Website.defaultProps = {
  website: {
    attributes: {},
    relationships: {}
  }
};


export default withStyles(styles)(Website);
