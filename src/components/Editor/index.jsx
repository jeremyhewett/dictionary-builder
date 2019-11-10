import React, {Component} from 'react';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

let Embed = Quill.import('blots/block/embed');

class Hr extends Embed {
  static blotName = 'hr'; //now you can use .ql-hr classname in your toolbar
  static tagName = 'hr';

  static create(value) {
    let node = super.create(value);
    node.setAttribute('style', "margin-left: 20px; margin-right: 20px;");
    return node;
  }
}

Quill.register({
  'formats/hr': Hr
});

function hrHandler() {
  let range = this.quill.getSelection();
  if (range) {
    this.quill.insertEmbed(range.index, 'hr', 'null')
  }
}

// Component styles
const styles = theme => {
  return {
    root: {
      position: 'relative',
      '& .ql-hr:after': {
        content: '"---"'
      },
      '& .ql-container': {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
      }
    },
    viewMode: {
      '& .ql-tooltip.ql-hidden': {
        display: 'none'
      },
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      'background': '#a8d1ff',
      opacity: 0,
      transition: 'opacity .3s',
      '&:hover': {
        opacity: 0.3
      }
    },
  };
};

const ESCAPE_KEY_CODE = 27;

class Editor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    };

    this.modules = {
      toolbar: {
        container: [
          [{'header': [1, 2, 3, false]}],
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote'],

          [{'list': 'ordered'}, {'list': 'bullet'}],
          [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
          [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent

          [{'color': []}, {'background': []}],          // dropdown with defaults from theme
          [{'align': 'center'}],

          ['link', 'image', 'hr'],

          ['clean']                                         // remove formatting button
        ],
        handlers: {
          'hr': hrHandler
        }
      }
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.state.isEditing && nextProps.readOnly) {
      this.blur();
    }
  }

  onRef(ref) {
    this.editor = ref && ref.editor;
    if (this.editor && this.state.isEditing) {
      this.editor.focus();
    }
  }

  startEditing() {
    this.setState({ isEditing: true });
  }

  onBlur() {
    this.setState({ isEditing: false });
  }

  blur() {
    if (this.editor) {
      this.editor.blur();
    }
  }

  onChange(value) {
    if (this.state.isEditing) {
      this.props.onChange(value);
    }
  }

  onKeyDown(event) {
    if (event.keyCode === ESCAPE_KEY_CODE) {
      this.blur();
    }
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root + (this.state.isEditing ? '' : ` ${classes.viewMode}`)}>
        <ReactQuill value={this.props.value}
                    onChange={this.onChange.bind(this)}
                    onKeyDown={this.onKeyDown.bind(this)}
                    modules={this.modules}
                    onBlur={this.onBlur.bind(this)}
                    ref={this.onRef.bind(this)}
                    readOnly={!this.state.isEditing}
                    theme={this.state.isEditing ? undefined : "bubble"}/>
        {!this.props.readOnly && !this.state.isEditing ? (
          <div className={classes.overlay} onClick={this.startEditing.bind(this)}/>
        ) : ''}
      </div>
    );
  }
}

Editor.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
};

export default withStyles(styles)(Editor);
