import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Typography } from '@material-ui/core';

// Shared components
import { Paper } from 'components';

// Component styles
import styles from './styles';

class EntryCard extends Component {
  render() {
    const { classes, className, entry } = this.props;

    const rootClassName = classNames(classes.root, className);

    let firstMeaning = entry.relationships.meanings[0];

    return (
      <Link to={`/entries/${entry.id}`}>
        <Paper className={rootClassName}>
          <div className={classes.details}>
            <Typography
              className={classes.title}
              variant="h4"
            >
              {entry.relationships.headword.attributes.headword}
            </Typography>
            {firstMeaning ? (
              <Typography
                className={classes.description}
                variant="body1"
              >
                {firstMeaning.attributes.partOfSpeech} {firstMeaning.attributes.definition}
              </Typography>
            ) : ''}
          </div>
        </Paper>
      </Link>
    );
  }
}

EntryCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  entry: PropTypes.object.isRequired
};

export default withStyles(styles)(EntryCard);
