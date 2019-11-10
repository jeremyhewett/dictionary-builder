import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { CircularProgress, Grid, Typography, TextField, Button, InputLabel, Paper, Tab, Tabs } from '@material-ui/core';
import { Dashboard as DashboardLayout } from 'layouts';
import service from 'services/citations';
import ReactQuill from 'react-quill';

import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from 'components';

import { Book, Periodical, Website, Utterance } from './components';
import styles from './styles';

const partOfSpeechOptions = [
  { value: '', label: '' },
  { value: 'n.', label: 'Noun' },
  { value: 'v.', label: 'Verb' },
  { value: 'adj.', label: 'Adjective' },
];

class Citation extends Component {
  signal = true;
  sourceTypes = [null, 'books', 'periodicals', 'utterances', 'websites'];

  state = {
    isLoading: false,
    citation: null,
    error: null
  };

  async getCitation() {
    try {
      this.setState({ isLoading: true });

      const citation = await service.getCitation(this.props.match.params.citationId);

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

  renderTitle() {
    const { classes } = this.props;
    const { citation } = this.state;

    return (
      <div>
        <Typography className={classes.title} variant="h4">Citation</Typography>
        <Typography className={classes.subtitle} variant="body2">ID {citation.id}</Typography>
      </div>
    );
  }

  onChange(path, value) {
    let citation = this.state.citation;
    _.set(citation, path, value);
    this.setState({ citation });
  }

  clipCitation() {
    let range = this.citationEditor.editor.getSelection(true);
    let contents = this.citationEditor.editor.getContents(range.index, range.length);
    let citation = this.state.citation;
    _.set(citation, 'attributes.clipStart', range.index);
    _.set(citation, 'attributes.clipEnd', range.index + range.length);
    _.set(citation, 'attributes.clippedText', contents);
    this.isClipping = true;
    this.setState({ citation });
  }

  onClippingChange(value) {
    if (this.isClipping) {
      this.isClipping = false;
      let citation = this.state.citation;
      _.set(citation, 'attributes.clippedText', value);
      this.setState({ citation });
    }
  }

  async save() {
    await service.updateCitation(this.state.citation);
  }

  renderCitationDetails() {
    const { classes } = this.props;
    const { citation } = this.state;
    const headword = citation.relationships.headword;

    return (
      <Portlet>
        <PortletHeader>
          <PortletLabel title="Citation Details" />
        </PortletHeader>
        <PortletContent noPadding>
          <form
            autoComplete="off"
            noValidate
          >
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Headword"
                margin="dense"
                required
                value={headword.attributes.headword}
                variant="outlined"
                onChange={(event) => this.onChange('relationships.headword.attributes.headword', event.target.value)}
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Short Meaning"
                margin="dense"
                value={citation.attributes.shortMeaning || ''}
                onChange={(event) => this.onChange('attributes.shortMeaning', event.target.value)}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Spelling Variant"
                margin="dense"
                value={citation.attributes.spellingVariant || ''}
                onChange={(event) => this.onChange('attributes.spellingVariant', event.target.value)}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Part of Speech"
                margin="dense"
                required
                select
                SelectProps={{ native: true }}
                value={citation.attributes.partOfSpeech || ''}
                onChange={(event) => this.onChange('attributes.partOfSpeech', event.target.value)}
                variant="outlined">
                {partOfSpeechOptions.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </div>
            <div className={classes.field}>
              <InputLabel htmlFor="citation-input">Citation</InputLabel>
              <ReactQuill className={classes.editor}
                          value={citation.attributes.text}
                          onChange={(value) => this.onChange(`attributes.text`, value)}
                          ref={ref => this.citationEditor = ref}
                          id="citation-input"/>
            </div>
            <div className={classes.field}>
              <Button
                variant="outlined"
                size="small"
                className={classes.clipButton}
                onClick={this.clipCitation.bind(this)}
              >Clip</Button>
            </div>
            <div className={classes.field}>
              <InputLabel>Clipped Citation{citation.attributes.clipEnd > citation.attributes.clipStart ? ` (${citation.attributes.clipStart} - ${citation.attributes.clipEnd})` : ''}</InputLabel>
              <ReactQuill value={ citation.attributes.clippedText || ''}
                          readOnly={true}
                          onChange={this.onClippingChange.bind(this)}
                          theme="bubble"/>
            </div>
          </form>
        </PortletContent>
      </Portlet>
    );
  }

  renderSourceForm() {
    const { citation } = this.state;
    switch(citation.attributes.sourceType) {
      case 'books': return <Book book={citation.relationships.book} />;
      case 'periodicals': return <Periodical periodical={citation.relationships.periodical} />;
      case 'websites': return <Website website={citation.relationships.website} />;
      case 'utterances': return <Utterance utterance={citation.relationships.utterance} />;
    }
  }

  renderSourceDetails() {
    const { classes } = this.props;
    const { citation } = this.state;
    const { book, periodical, website, utterance } = citation.relationships;

    return (
      <Portlet>
        <PortletHeader>
          <PortletLabel title="Source Details" />
        </PortletHeader>
        <PortletContent noPadding>
          <Paper square>
            <Tabs
              value={citation.attributes.sourceType}
              indicatorColor="primary"
              textColor="primary"
              onChange={(e, value) => this.onChange('attributes.sourceType', value)}
            >
              <Tab className={classes.sourceTab} value={null} label="None"/>
              <Tab className={classes.sourceTab} value="books" label="Book" />
              <Tab className={classes.sourceTab} value="periodicals" label="Periodical" />
              <Tab className={classes.sourceTab} value="utterances" label="Spoken" />
              <Tab className={classes.sourceTab} value="websites" label="Website/Other" />
            </Tabs>
          </Paper>
          {this.renderSourceForm()}
        </PortletContent>
        {/*<PortletFooter className={classes.portletFooter}>
          <Button
            color="primary"
            variant="contained"
            className={classes.saveButton}
          >
            Save
          </Button>
        </PortletFooter>*/}
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
              {this.renderCitationDetails()}
            </Grid>
            <Grid item lg={5} md={5} xl={5} xs={12}>
              {this.renderSourceDetails()}
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

Citation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Citation);
