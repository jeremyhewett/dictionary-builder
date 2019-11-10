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

class Utterance extends Component {

  constructor(props) {
    super(props);
    this.state = {
      utterance: props.utterance,
      error: null
    };
  }

  onChange(path, value) {
    let utterance = this.state.utterance;
    _.set(utterance, path, this.fromViewValue(value));
    this.setState({ utterance });
  }

  fromViewValue(value) {
    return value === '' ? null : value;
  }

  render() {
    const { classes, utterance } = this.props;
    return (
      <form autoComplete="off" noValidate>
        <div className={classes.field}>
          <TextField
            className={classes.textField}
            label="Uttered by"
            margin="dense"
            required
            value={utterance.attributes.utteredBy}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.utteredBy', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Date of utterance"
            margin="dense"
            value={utterance.attributes.utteranceDate}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.utteranceDate', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Time of utterance"
            margin="dense"
            value={utterance.attributes.utteranceTime}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.utteranceTime', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Year recorded"
            margin="dense"
            value={utterance.attributes.yearRecorded}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.yearRecorded', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Media"
            margin="dense"
            value={utterance.attributes.media}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.media', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Broadcast"
            margin="dense"
            value={utterance.attributes.broadcast}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.broadcast', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Place"
            margin="dense"
            value={utterance.attributes.place}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.place', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Witnessed by"
            margin="dense"
            value={utterance.attributes.witness}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.witness', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Url"
            margin="dense"
            value={utterance.attributes.url}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.url', event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Url accessed date"
            margin="dense"
            value={utterance.attributes.urlAccessedAt}
            variant="outlined"
            onChange={(event) => this.onChange('attributes.urlAccessedAt', event.target.value)}
          />
        </div>
      </form>
    );
  }
}

Utterance.propTypes = {
  classes: PropTypes.object.isRequired,
  utterance: PropTypes.object
};

Utterance.defaultProps = {
  utterance: {
    attributes: {},
    relationships: {}
  }
};

export default withStyles(styles)(Utterance);
