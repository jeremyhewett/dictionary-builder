import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Button, TextField } from '@material-ui/core';
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from 'components';

import CitationCard from '../CitationCard';
import styles from './styles';

class Headword extends Component {
  state = {

  };

  handleChange = e => {
    this.setState({
      state: e.target.value
    });
  };

  render() {
    const { classes, className, headword, ...rest } = this.props;
    const { } = this.state;

    return (
      <div>
        {
          headword.relationships.citations.map(citation => (
            <CitationCard key={citation.id} citation={citation} />
          ))
        }
      </div>
    );
  }
}

Headword.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  headword: PropTypes.object.isRequired
};

export default withStyles(styles)(Headword);
