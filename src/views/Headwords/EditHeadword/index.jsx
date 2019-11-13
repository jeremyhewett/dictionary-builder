import _ from 'lodash';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { CircularProgress, Grid, Typography, TextField, Button } from '@material-ui/core';
import { Dashboard as DashboardLayout } from 'layouts';
import service from 'services/headwords';

import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from 'components';

import styles from './styles';

class EditHeadword extends Component {
  signal = true;

  state = {
    isLoading: false,
    isNew: !this.props.match.params.headwordId,
    headword: null,
    error: null
  };

  async getHeadword() {
    try {
      this.setState({ isLoading: true });

      const headword = this.state.isNew ?
        { attributes: {}}
        : await service.getHeadword(this.props.match.params.headwordId);

      if (this.signal) {
        this.setState({
          isLoading: false,
          headword
        });
      }
    } catch (error) {
      if (this.signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  }

  componentWillMount() {
    this.signal = true;
    this.getHeadword();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  renderTitle() {
    const { classes } = this.props;
    const { headword, isNew } = this.state;

    return (
      <div>
        <Typography className={classes.title} variant="h4">Headword</Typography>
        {isNew ? '' : <Typography className={classes.subtitle} variant="body2">ID {headword.id}</Typography>}
      </div>
    );
  }

  onChange(path, value) {
    let headword = this.state.headword;
    _.set(headword, path, value);
    this.setState({ headword });
  }

  async save() {
    try {
      let headword = this.state.isNew ?
        await service.createHeadword(this.state.headword) :
        await service.updateHeadword(this.state.headword);
      this.props.history.push(`/headwords/${headword.id}`);
    } catch(err) {
      alert(`Error: ${err}`);
    }
  }

  renderHeadwordForm() {
    const { classes } = this.props;
    const { headword, isNew } = this.state;

    return (
      <Portlet>
        <PortletHeader>
          <PortletLabel title={ isNew ? 'Create' : 'Edit'} />
        </PortletHeader>
        <PortletContent noPadding>
          <form autoComplete="off" noValidate>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Headword"
                margin="dense"
                required
                value={headword.attributes.headword || ''}
                variant="outlined"
                onChange={(event) => this.onChange('attributes.headword', event.target.value || null)}
              />
            </div>
          </form>
        </PortletContent>
      </Portlet>
    );
  }

  render() {
    const { classes } = this.props;
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <DashboardLayout>
          <div className={classes.progressWrapper}>
            <CircularProgress />
          </div>
        </DashboardLayout>
      );
    }

    return (
      <DashboardLayout title={this.renderTitle()}>
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
              onClick={this.save.bind(this)}
            >Save</Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }
}

EditHeadword.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(EditHeadword);
