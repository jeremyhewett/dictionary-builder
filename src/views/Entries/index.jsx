import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  IconButton,
  CircularProgress,
  Typography
} from '@material-ui/core';

// Material icons
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon
} from '@material-ui/icons';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Shared services
import { getEntries } from 'services/entries';

// Custom components
import AlphabetToolbar from '../../components/AlphabetToolbar';
import EntryCard from './components/EntryCard';

// Component styles
import styles from './styles';

class Entries extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 6,
    entries: [],
    selectedLetter: null,
    error: null
  };

  async getEntries(limit) {
    try {
      this.setState({ isLoading: true });

      const entries = await getEntries(limit);

      if (this.signal) {
        this.setState({
          isLoading: false,
          entries,
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

    this.getEntries(limit);
  }

  componentWillUnmount() {
    this.signal = false;
  }

  renderEntries() {
    const { classes } = this.props;
    const { isLoading, entries, selectedLetter } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    let visibleEntries = entries.filter(entry => !selectedLetter ||
      entry.relationships.headword.attributes.headword.charAt(0).toLowerCase() === selectedLetter.toLowerCase());

    if (visibleEntries.length === 0) {
      return (
        <Typography variant="h6">No entries to display</Typography>
      );
    }

    return (
      visibleEntries.map(entry => (
        <EntryCard key={entry.id} entry={entry} />
      ))
    );
  }

  render() {
    const { classes } = this.props;
    const { selectedLetter } = this.state;

    return (
      <DashboardLayout title="Entries">
        <div className={classes.root}>
          <AlphabetToolbar onChange={this.selectLetter.bind(this)} selectedLetter={selectedLetter} />
          <div className={classes.content}>{this.renderEntries()}</div>
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

Entries.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Entries);
