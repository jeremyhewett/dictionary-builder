import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import { Typography, Button, LinearProgress } from '@material-ui/core';
import { Portlet, PortletContent, PortletFooter } from 'components';
import styles from './styles';

class HeadwordProfile extends Component {
  hasEntry = this.props.headword.relationships.entry;

  goToEntry() {
    let entryId = this.props.headword.relationships.entry.id;
    this.props.history.push(`/entries/${entryId}`);
  }

  goToEdit() {
    this.props.history.push(`${this.props.headword.id}/edit`);
  }

  addCitation() {
    this.props.history.push(`/citations/new/${this.props.headword.id}`);
  }

  render() {
    const { classes, className, headword, isEditable, staticContext /*to avoid react error*/, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet {...rest} className={rootClassName}>
        <PortletContent>
          <div className={classes.details}>
            <div className={classes.info}>
              <Typography variant="h2">{headword.attributes.headword}</Typography>
              <Typography className={classes.dateText} variant="body1">
                Created 1 January 2010
              </Typography>
              <Typography className={classes.locationText} variant="body1">
                { headword.relationships.citations.length } Citations
              </Typography>
            </div>
            {/*<Avatar className={classes.avatar} src="/images/avatars/avatar_1.png"/>*/}
          </div>
          <div className={classes.progressWrapper}>
            <Typography variant="body1">Entry Completeness: {headword.meta.completeness}%</Typography>
            <LinearProgress value={headword.meta.completeness} variant="determinate"/>
          </div>
        </PortletContent>
        <PortletFooter>
          {isEditable ?
            <Button onClick={this.goToEdit.bind(this)} className={classes.actionButton} color="primary" variant="text">
              Edit
            </Button> : ''
          }
          {isEditable ?
            <Button onClick={this.addCitation.bind(this)} className={classes.actionButton} color="primary" variant="text">
              Add Citation
            </Button> : ''
          }
          {this.hasEntry ?
            <Button onClick={this.goToEntry.bind(this)} className={classes.actionButton} color="primary" variant="text">
              Go To Entry
            </Button> : ''
          }
          {/*<Button variant="text">Remove picture</Button>*/}
        </PortletFooter>
      </Portlet>
    );
  }
}

HeadwordProfile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  headword: PropTypes.object.isRequired,
  isEditable: PropTypes.bool,
  history: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(HeadwordProfile);
