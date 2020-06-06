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

class HeadwordCard extends Component {
  render() {
    const { classes, className, headword } = this.props;

    const rootClassName = classNames(classes.root, className);

    let citationsCount = headword.meanings.reduce((total, meaning) => total += meaning.citationsStats.count.value, 0);

    return (
      <Link to={`/headwords/${headword.id}`}>
        <Paper className={rootClassName}>
          <div className={classes.details}>
            <Typography
              className={classes.title}
              variant="h4"
            >
              {headword.headword}
            </Typography>
            <Typography
              className={classes.description}
              variant="body1"
            >
              {citationsCount} Citations
            </Typography>
          </div>
        </Paper>
      </Link>
    );
  }
}

HeadwordCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  headword: PropTypes.object.isRequired
};

export default withStyles(styles)(HeadwordCard);
