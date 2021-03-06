import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import { CircularProgress, Typography } from '@material-ui/core';
import { Dashboard as DashboardLayout } from 'layouts';
import service from 'services/citations';
import EditCitation from './EditCitation';

import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from 'components';

const styles = theme => ({
  title: {
    display: 'inline-block',
    paddingRight: '10px'
  },
  subtitle: {
    display: 'inline-block',
    fontWeight: 400,
    color: theme.palette.text.secondary
  },
  progressWrapper: {
    padding: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  }
});

class UpdateCitation extends Component {
  signal = true;

  state = {
    isLoading: false,
    citation: null,
    error: null
  };

  async getCitation() {
    try {
      this.setState({ isLoading: true });

      let citation = await service.getCitation(this.props.match.params.citationId);

      if (this.signal) {
        this.setState({
          isLoading: false,
          citation
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
    this.getCitation();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  async save() {
    let citation = await service.updateCitation(this.state.citation);
    this.setState({ citation });
  }

  renderTitle() {
    const {classes} = this.props;
    const {citation} = this.state;

    return (
      <div>
        <Typography className={classes.title} variant="h4">Citation</Typography>
        <Typography className={classes.subtitle} variant="body2">ID {citation.id}</Typography>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const { isLoading, citation } = this.state;

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
        <EditCitation citation={citation} onSave={this.save.bind(this)}></EditCitation>
      </DashboardLayout>
    );
  }
}

UpdateCitation.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(UpdateCitation);
