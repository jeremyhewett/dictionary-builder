import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

// Component styles
import styles from './styles';

class EntriesToolbar extends Component {

  handleChange(event, value) {
    this.props.onChange(value);
  }

  render() {
    const { classes, className, selectedLetter } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <ToggleButtonGroup className={classes.buttonGroup} value={selectedLetter} exclusive onChange={this.handleChange.bind(this)}>
            <ToggleButton className={classes.letter} value="A">A</ToggleButton>
            <ToggleButton className={classes.letter} value="B">B</ToggleButton>
            <ToggleButton className={classes.letter} value="C">C</ToggleButton>
            <ToggleButton className={classes.letter} value="D">D</ToggleButton>
            <ToggleButton className={classes.letter} value="E">E</ToggleButton>
            <ToggleButton className={classes.letter} value="F">F</ToggleButton>
            <ToggleButton className={classes.letter} value="G">G</ToggleButton>
            <ToggleButton className={classes.letter} value="H">H</ToggleButton>
            <ToggleButton className={classes.letter} value="I">I</ToggleButton>
            <ToggleButton className={classes.letter} value="J">J</ToggleButton>
            <ToggleButton className={classes.letter} value="K">K</ToggleButton>
            <ToggleButton className={classes.letter} value="L">L</ToggleButton>
            <ToggleButton className={classes.letter} value="M">M</ToggleButton>
            <ToggleButton className={classes.letter} value="N">N</ToggleButton>
            <ToggleButton className={classes.letter} value="O">O</ToggleButton>
            <ToggleButton className={classes.letter} value="P">P</ToggleButton>
            <ToggleButton className={classes.letter} value="Q">Q</ToggleButton>
            <ToggleButton className={classes.letter} value="R">R</ToggleButton>
            <ToggleButton className={classes.letter} value="S">S</ToggleButton>
            <ToggleButton className={classes.letter} value="T">T</ToggleButton>
            <ToggleButton className={classes.letter} value="U">U</ToggleButton>
            <ToggleButton className={classes.letter} value="V">V</ToggleButton>
            <ToggleButton className={classes.letter} value="W">W</ToggleButton>
            <ToggleButton className={classes.letter} value="X">X</ToggleButton>
            <ToggleButton className={classes.letter} value="Y">Y</ToggleButton>
            <ToggleButton className={classes.letter} value="Z">Z</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    );
  }
}

EntriesToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  selectedLetter: PropTypes.string,
  onChange: PropTypes.func
};

EntriesToolbar.defaultProps = {
  selectedLetter: 'A'
};

export default withStyles(styles)(EntriesToolbar);
