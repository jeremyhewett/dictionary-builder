import _ from 'lodash';
import React, { Component } from 'react';
import { getEntry } from 'services/entries';
import ReactQuill from 'react-quill';
import Editor from 'components/Editor';
import { state as appState } from 'App';
import api from 'services/api';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Paper, CircularProgress, Typography } from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Component styles
import styles from './styles';

class Entry extends Component {
  signal = true;

  state = {
    isLoading: false,
    isEditMode: appState.get('isEditMode'),
    entry: null,
    error: null
  };

  updaters = {};

  async getEntry() {
    try {
      this.setState({ isLoading: true });

      const entry = await getEntry(this.props.match.params.entryId);

      if (this.signal) {
        this.setState({
          isLoading: false,
          entry
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

  getUpdater(path, property) {
    if (this.updaters[`${path}.${property}`]) return this.updaters[`${path}.${property}`];

    let save = _.debounce(async object => {
      await api.put(`${object.type}/${object.id}`, {
        type: object.type,
        id: object.id,
        attributes: { [property]: object.attributes[property] }
      });
    }, 1000);
    let updater = value => {
      let entry = Object.assign({}, this.state.entry);
      let object = _.get(entry, path);
      object.attributes[property] = value;
      this.setState({ entry });
      save(object);
    };
    this.updaters[`${path}.${property}`] = updater;
    return updater;
  }

  componentWillMount() {
    this._unwatch = appState.watch('isEditMode', isEditMode => {
      this.setState({ isEditMode });
    });
    this.signal = true;
    this.getEntry();
  }

  componentWillUnmount() {
    this._unwatch();
    this.signal = false;
  }

  renderTitle(entry, classes) {
    return (
      <div>
        <Typography className={classes.title} variant="h4">{entry.relationships.headword.attributes.headword}</Typography>
        <Typography className={classes.spellingVariants} variant="body2">{entry.attributes.spellingVariants}</Typography>
        &nbsp;
        <ReactQuill value={entry.attributes.etymology}
                    readOnly={true}
                    className={classes.inlineViewer}
                    theme="bubble"/>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const { isLoading, isEditMode, entry } = this.state;

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
      <DashboardLayout title={this.renderTitle(entry, classes)}>
        <div className={classes.container}>
          {entry.relationships.meanings.map((meaning, meaningIndex) => (
            <Paper key={meaning.id} className={classes.section}>
              <div>
                <span className={classes.order}>{meaning.attributes.order}</span>
                &nbsp;
                <span className={classes.partOfSpeech}>{meaning.attributes.partOfSpeech}</span>
              </div>
              <Typography className={classes.definition} variant="body2">{meaning.attributes.definition}</Typography>
              <Typography className={classes.canadianismType} variant="body2">Type: {meaning.attributes.canadianismType}</Typography>
              <Editor value={meaning.attributes.canadianismTypeComment} readOnly={!isEditMode} onChange={this.getUpdater(`relationships.meanings[${meaningIndex}]`, 'canadianismTypeComment')} />
              <div className={classes.citations}>
                {meaning.relationships.citations.map(citation => (
                  <Typography key={citation.id}
                              className={classes.citation}
                              variant="body2">
                    <span className={classes.citationYear}>2019</span>
                     {citation.attributes.clippedText}
                  </Typography>
                ))}
              </div>
            </Paper>
          ))}
        </div>
      </DashboardLayout>
    );
  }
}

Entry.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Entry);
