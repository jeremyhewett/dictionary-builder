import _ from 'lodash';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Grid, TextField, Button } from '@material-ui/core';

import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from 'components';

import styles from './styles';

class EditHeadword extends Component {

  state = {
    headword: this.props.headword,
    error: null
  };

  componentWillMount() {}

  componentWillUnmount() {}

  onChange(path, value) {
    let headword = this.state.headword;
    _.set(headword, path, value);
    this.setState({ headword });
  }

  renderHeadwordForm() {
    const { classes } = this.props;
    const { headword } = this.state;

    return (
      <Portlet>
        <PortletHeader>
          <PortletLabel title="Details" />
        </PortletHeader>
        <PortletContent noPadding>
          <form autoComplete="off" noValidate>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Headword"
                margin="dense"
                required
                value={headword.headword || ''}
                variant="outlined"
                onChange={(event) => this.onChange('headword', event.target.value || null)}
              />
            </div>
          </form>
        </PortletContent>
      </Portlet>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={7} md={7} xl={7} xs={12}>
            {this.renderHeadwordForm()}
          </Grid>
        </Grid>
        <div className={classes.row}>
          <Button
            color="primary"
            variant="contained"
            className={classes.saveButton}
            onClick={this.props.onSave}
          >Save</Button>
        </div>
      </div>
    );
  }
}

EditHeadword.propTypes = {
  headword: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(EditHeadword);
