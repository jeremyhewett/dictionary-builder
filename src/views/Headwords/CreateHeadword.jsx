import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { CircularProgress, Typography } from '@material-ui/core';
import { Dashboard as DashboardLayout } from 'layouts';
import EditHeadword from './EditHeadword';
import service from 'services/headwords';

import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from 'components';

const styles = theme => ({
  progressWrapper: {
    padding: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  }
});

class CreateHeadword extends Component {
  signal = true;

  state = {
    isLoading: false,
    headword: null,
    error: null
  };

  async getHeadword() {
    try {
      this.setState({ isLoading: true });

      const headword = { attributes: {}};

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

  async save() {
    try {
      let headword = await service.createHeadword(this.state.headword);
      this.props.history.push(`/headwords/${headword.id}`);
    } catch(err) {
      alert(`Error: ${err}`);
    }
  }

  renderTitle() {
    const { classes } = this.props;

    return (
      <div>
        <Typography className={classes.title} variant="h4">New Headword</Typography>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const { isLoading, headword } = this.state;

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
        <EditHeadword headword={headword} onSave={this.save.bind(this)}/>
      </DashboardLayout>
    );
  }
}

CreateHeadword.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(CreateHeadword);
