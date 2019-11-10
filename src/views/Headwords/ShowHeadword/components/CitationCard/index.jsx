import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Paper } from 'components';

import styles from './styles';

class CitationCard extends Component {
  render() {
    const { classes, className, citation } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Link to={`/citations/${citation.id}`}>
        <Paper className={rootClassName}>
          <div className={classes.details}>
            <Typography className={classes.title} variant="h4">
              {citation.attributes.shortMeaning}
            </Typography>
            <Typography className={classes.description} variant="body1">
              {citation.attributes.clippedText}
            </Typography>
          </div>
        </Paper>
      </Link>
    );
  }
}

CitationCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  citation: PropTypes.object.isRequired
};

export default withStyles(styles)(CitationCard);
