import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CircularProgress, Grid, TextField, Button, InputLabel, Paper, Tab, Tabs } from '@material-ui/core';
import ReactQuill from 'react-quill';
import citationService from 'services/citations';
import ComboBox from 'components/ComboBox';

import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from 'components';

import { EditSource } from './components';
import styles from './styles';

const partOfSpeechOptions = [
  { value: '', label: '' },
  { value: 'noun', label: 'Noun' },
  { value: 'verb', label: 'Verb' },
  { value: 'adjective', label: 'Adjective' },
  { value: 'adverb', label: 'Adverb' },
  { value: 'properNoun', label: 'Proper Noun' },
];

class EditCitation extends Component {
  signal = true;

  state = {
    isLoading: false,
    citation: this.props.citation,
    error: null
  };

  async getHeadwords() {
    try {
      this.setState({
        isLoading: true,
        headwordOptions: [],
        selectedHeadwordOption: { label: '', value: null },
        meaningOptions: [],
        selectedMeaningOption: { label: '', value: null },
      });

      let headwords = await citationService.getHeadwords();
      let headwordOptions = headwords.map(headword => ({ label: headword.headword, value: headword }));
      let citation = this.props.citation;
      let selectedHeadwordOption = headwordOptions.find(option => option.value.id === citation.meaning.headword.id);
      let meanings = await citationService.getMeanings(selectedHeadwordOption.value);
      let meaningOptions = meanings.map(meaning => ({ label: meaning.shortMeaning, value: meaning }));
      let selectedMeaningOption = meaningOptions.find(option => option.value.id === citation.meaning.id);

      if (this.signal) {
        this.setState({
          isLoading: false,
          headwordOptions,
          selectedHeadwordOption,
          meaningOptions,
          selectedMeaningOption,
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
    this.getHeadwords();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  componentDidUpdate(prevProps){
    if(prevProps.citation !== this.props.citation) {
      console.log('component did update');
      this.setState({ citation: this.props.citation });
      this.getHeadwords();
    }
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
    _.set(citation, 'clipStart', range.index);
    _.set(citation, 'clipEnd', range.index + range.length);
    _.set(citation, 'clippedText', contents);
    this.isClipping = true;
    this.setState({ citation });
  }

  onClippingChange(value) {
    if (this.isClipping) {
      this.isClipping = false;
      let citation = this.state.citation;
      _.set(citation, 'clippedText', value);
      this.setState({ citation });
    }
  }

  async headwordChanged(option) {
    console.log(`headwordChanged: ${JSON.stringify(option)}`);
    this.setState({
      selectedHeadwordOption: option,
      meaningOptions: [],
      selectedMeaningOption: { label: '', value: null },
    });
    if (typeof option.value === 'string') {
      let headword = { headword: option.value };
      this.onChange('meaning', { headword });
    } else {
      let headword = option.value;
      this.onChange('meaning', { headword });
      let meanings = await citationService.getMeanings(option.value);
      let meaningOptions = meanings.map(meaning => ({ label: meaning.shortMeaning, value: meaning }));
      let selectedMeaningOption = meaningOptions.length ? meaningOptions[0] : null;
      let meaning = selectedMeaningOption ? selectedMeaningOption.value : { headwordId: option.value.id };
      this.onChange('meaning', { ...meaning, headword: option.value });
      this.setState({ meaningOptions, selectedMeaningOption });
    }
  }

  meaningChanged(option) {
    console.log(`meaningChanged: ${JSON.stringify(option)}`);
    this.setState({ selectedMeaningOption: option });
    let headword = this.state.citation.meaning.headword;
    let meaning = typeof option.value === 'string' ? {
      shortMeaning: option.value,
      headwordId: headword.id,
      headword
    } : {
      ...option.value,
      headword
    };
    this.onChange('meaning', meaning);
  }

  async save() {
    this.setState({ isLoading: true });
    try {
      this.props.onSave();
    } finally {
      this.setState({ isLoading: false });
    }
  }

  renderCitationDetails() {
    const { classes } = this.props;
    const { citation,
      headwordOptions,
      selectedHeadwordOption,
      meaningOptions,
      selectedMeaningOption,
    } = this.state;

    return (
      <Portlet>
        <PortletHeader>
          <PortletLabel title="Citation Details" />
        </PortletHeader>
        <PortletContent noPadding>
          <form autoComplete="off" noValidate>
            <div className={classes.field}>
              <ComboBox
                style={{display: 'inline-block'}}
                options={headwordOptions}
                classes={classes}
                value={selectedHeadwordOption}
                onChange={(value) => this.headwordChanged(value)}
                required
                label="Headword"/>
              <div style={{ display: 'inline-block', position: 'relative' }}>
                {(typeof selectedHeadwordOption.value) === 'string' ? <span style={{fontStyle: 'italic', fontSize: 12, color: 'green', position: 'absolute', left: '-18px', top: '4px'}}>NEW</span> : ''}
              </div>
            </div>
            <div className={classes.field}>
              <ComboBox
                style={{display: 'inline-block'}}
                options={meaningOptions}
                classes={classes}
                value={selectedMeaningOption}
                onChange={(value) => this.meaningChanged(value)}
                required
                label="Meaning"/>
              <div style={{ display: 'inline-block', position: 'relative' }}>
                {typeof selectedMeaningOption.value === 'string' ? <span style={{fontStyle: 'italic', fontSize: 12, color: 'green', position: 'absolute', left: '-18px', top: '4px'}}>NEW</span> : ''}
              </div>
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Part of Speech"
                margin="dense"
                required
                disabled={typeof selectedMeaningOption.value !== 'string'}
                select
                SelectProps={{ native: true }}
                value={citation.meaning.partOfSpeech || ''}
                onChange={(event) => this.onChange('meaning.partOfSpeech', event.target.value)}
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
                          value={citation.text || ''}
                          onChange={(value) => this.onChange(`text`, value || null)}
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
              <InputLabel>Clipped Citation{citation.clipEnd > citation.clipStart ? ` (${citation.clipStart} - ${citation.clipEnd})` : ''}</InputLabel>
              <ReactQuill value={ citation.clippedText || ''}
                          readOnly={true}
                          onChange={this.onClippingChange.bind(this)}
                          theme="bubble"/>
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Memo"
                margin="dense"
                value={citation.memo || ''}
                onChange={(event) => this.onChange('memo', event.target.value)}
                variant="outlined">
              </TextField>
            </div>
          </form>
        </PortletContent>
      </Portlet>
    );
  }

  renderSourceDetails() {
    const { classes } = this.props;
    const { citation } = this.state;

    return (
      <Portlet>
        <PortletHeader>
          <PortletLabel title="Source Details" />
        </PortletHeader>
        <PortletContent noPadding>
          <EditSource source={citation.source}/>
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
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    return (
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
    );
  }
}

EditCitation.propTypes = {
  citation: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditCitation);
