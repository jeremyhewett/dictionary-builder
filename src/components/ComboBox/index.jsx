import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material components
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';


class ComboBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || { label: '', value: null }
    };
    this.customValue = null;
  }

  componentDidUpdate(prevProps) {
    if(prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value || { label: '', value: null } });
    }
  }

  onChange(event, value) {
    if (typeof value === 'string') {
      this.customValue = value;
    } else {
      this.customValue = null;
      this.setState({ value });
      this.props.onChange(value);
    }
  }

  onInputChange(event, value) {
    if (event && event.type === 'change') {
      this.customValue = value;
    }
  }

  onBlur() {
    if (this.customValue !== null) {
      let option = this.props.options.find(option => option.label === this.customValue);
      if (option) {
        this.setState({ value: option });
        if (option !== this.props.value) {
          this.props.onChange(option);
        }
      } else {
        this.props.onChange({ label: this.customValue, value: this.customValue });
      }
      this.customValue = null;
    }
  }

  getOptionLabel(option) {
    return typeof option === 'string' ? option : option.label || '<blank>';
  }

  render() {
    const { classes, required, options, label } = this.props;

    return (
      <Autocomplete
        style={{ display: 'inline-block' }}
        options={options}
        className={classes.textField}
        freeSolo={true}
        getOptionLabel={this.getOptionLabel}
        disableClearable
        value={this.state.value}
        onChange={(event, value) => this.onChange(event, value)}
        onInputChange={(event, value) => this.onInputChange(event, value)}
        onBlur={() => this.onBlur()}
        renderInput={params => (
          <TextField
            {...params}
            label={label}
            margin="dense"
            required={required}
            variant="outlined"
            fullWidth />
        )}
      />
    );
  }
}

ComboBox.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  value: PropTypes.object,
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  label: PropTypes.string
};

export default ComboBox;
