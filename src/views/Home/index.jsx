import React, {Component} from 'react';
import _ from 'lodash';
import Editor from 'components/Editor';
import { state as appState } from 'App';
import 'react-quill/dist/quill.snow.css';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import {withStyles} from '@material-ui/core';

// Shared layouts
import {Dashboard as DashboardLayout} from 'layouts';

// Shared services
import {getContent, updateContent} from 'services/content';

// Component styles
import styles from './styles';

class Home extends Component {

  state = {
    isLoading: false,
    content: null,
    isEditMode: appState.get('isEditMode'),
    error: null
  };

  constructor(props) {
    super(props);
    this.saveContent = _.debounce(this._saveContent.bind(this), 1000);
  }

  async getContent() {
    try {
      this.setState({isLoading: true});

      const content = await getContent('home');

      if (!this.unmounting) {
        this.setState({
          isLoading: false,
          content
        });
      }
    } catch (error) {
      if (!this.unmounting) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  }

  async _saveContent() {
    try {
      await updateContent('home', this.state.content);
    } catch {
      if (!this.unmounting) {
        this.getContent();
      }
    }
  }

  componentWillMount() {
    this._unwatch = appState.watch('isEditMode', isEditMode => {
      this.setState({ isEditMode });
    });
    this.unmounting = false;
    this.getContent();
  }

  componentWillUnmount() {
    this._unwatch();
    this.unmounting = true;
  }

  onChange(html) {
    this.setState({ content: html });
    this.saveContent();
  }

  renderEditor() {
    if (this.state.isLoading) {
      return 'Loading'
    }
    return (
      <Editor value={this.state.content}
              onChange={this.onChange.bind(this)}
              readOnly={!this.state.isEditMode}
      />
    );
  }

  render() {
    const {classes} = this.props;

    return (
      <DashboardLayout title="Home">
        <div className={classes.root}>
          <div className={classes.content}>
            {this.renderEditor()}
          </div>
        </div>
      </DashboardLayout>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
