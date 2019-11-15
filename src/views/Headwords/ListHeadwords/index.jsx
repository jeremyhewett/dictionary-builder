import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import {
  Button,
  IconButton,
  CircularProgress,
  Typography
} from '@material-ui/core';
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon
} from '@material-ui/icons';
import { Dashboard as DashboardLayout } from 'layouts';
import service from 'services/headwords';
import AlphabetToolbar from '../../../components/AlphabetToolbar';
import HeadwordCard from './components/HeadwordCard';
import { state as appState } from 'App';

import styles from './styles';

class Headwords extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 6,
    headwords: [],
    selectedLetter: null,
    error: null,
    user: appState.get('user')
  };

  async getHeadwords(limit) {
    try {
      this.setState({ isLoading: true });

      const headwords = await service.getHeadwords(limit);

      if (this.signal) {
        this.setState({
          isLoading: false,
          headwords: headwords,
          limit
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

  selectLetter(selectedLetter) {
    this.setState({ selectedLetter });
  }

  componentWillMount() {
    this.signal = true;

    const { limit } = this.state;

    this.getHeadwords(limit);

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

  newHeadword() {
    this.props.history.push('headwords/new');
  }

  renderHeadwords() {
    const { classes } = this.props;
    const { isLoading, headwords, selectedLetter } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    let visibleHeadwords = headwords.filter(headword => !selectedLetter ||
      headword.attributes.headword.charAt(0).toLowerCase() === selectedLetter.toLowerCase());

    if (visibleHeadwords.length === 0) {
      return (
        <Typography variant="h6">No headwords to display</Typography>
      );
    }

    return (
      visibleHeadwords.map(headword => (
        <HeadwordCard key={headword.id} headword={headword} />
      ))
    );
  }

  render() {
    const { classes } = this.props;
    const { selectedLetter } = this.state;

    return (
      <DashboardLayout title="Headwords">
        <div className={classes.root}>
          {this.canEdit() ? (
              <div className={classes.row}>
                <span className={classes.spacer} />
                <Button onClick={this.newHeadword.bind(this)} color="primary" size="small" variant="outlined">New Headword</Button>
              </div>)
            : ''
          }
          <AlphabetToolbar onChange={this.selectLetter.bind(this)} selectedLetter={selectedLetter} />
          <div className={classes.content}>{this.renderHeadwords()}</div>
          <div className={classes.pagination}>
            <Typography variant="caption">1-6 of 20</Typography>
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
          </div>
        </div>
      </DashboardLayout>
    );
  }
}

Headwords.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default compose(
  withRouter,
  withStyles(styles)
)(Headwords);
