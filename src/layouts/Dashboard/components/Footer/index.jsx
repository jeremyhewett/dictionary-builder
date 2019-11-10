import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Divider, Typography } from '@material-ui/core';

// Component styles
const styles = theme => ({
  root: {
    flex: 2,
    padding: theme.spacing(4),
    paddingBottom: theme.spacing(2)
  },
  company: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0.5)
  }
});

class Footer extends Component {
  render() {
    const { classes, className } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div style={{height: '100%', position: 'relative'}}>
          <div style={{position: 'absolute', bottom: 0, width: '100%'}} >
            <Divider />
            {/*<Typography
          className={classes.company}
          variant="body1"
        >

        </Typography>*/}
            <Typography variant="caption">
              &copy; Stefan Dollinger; Nelson Education Ltd.; and The University of British Columbia, 2017. All rights reserved.
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
