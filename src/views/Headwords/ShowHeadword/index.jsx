import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Grid, CircularProgress } from '@material-ui/core';
import { Dashboard as DashboardLayout } from 'layouts';
import { HeadwordProfile, HeadwordDetails } from './components';
import { state as appState } from 'App';
import service from 'services/headwords';

const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  }
});

class Headword extends Component {
  state = {
    tabIndex: 0,
    isLoading: false,
    user: appState.get('user')
  };

  async getData() {
    try {
      this.setState({ isLoading: true });

      const headword = await service.getHeadword(this.props.match.params.headwordId);

      if (this.signal) {
        this.setState({
          isLoading: false,
          headword: headword
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
    this.getData();
    this._unwatch = appState.watch('user', user => {
      this.setState({ user });
    });
  }

  componentWillUnmount() {
    this._unwatch();
    this.signal = false;
  }

  canEdit() {
    return this.state.user && this.state.user.attributes.roles.includes('editor');
  }

  render() {
    const { classes } = this.props;
    const { headword, isLoading } = this.state;

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
      <DashboardLayout title="Headword">
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item lg={4} md={6} xl={4} xs={12}>
              <HeadwordProfile headword={headword} isEditable={this.canEdit()}/>
            </Grid>
            <Grid item lg={8} md={6} xl={8} xs={12}>
              <HeadwordDetails headword={headword} />
            </Grid>
          </Grid>
        </div>
      </DashboardLayout>
    );
  }
}

Headword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Headword);
