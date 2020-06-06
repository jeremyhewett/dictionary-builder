import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Author from '../../../../types/Author';

class ApaCitation extends Component {
  i = 1;

  join(elements, joinString) {
    let result = elements
      .filter(x => x)
      .reduce((elements, elem) => elements.concat([elem, <span key={this.i++}>{joinString}</span>]), []);
    result.pop();
    return result;
  }

  renderAuthor() {
    let author = new Author(this.props.source.author);
    if (!author || !author.surname) {
      return '';
    }
    return <span key="author">{[author.surname, author.initials()].filter(x => x).join(', ')}</span>;
  }

  renderDate() {
    let source = this.props.source;
    if (!source.yearPublished && !source.datePublished) {
      return '';
    }
    return <span key="date">({source.yearPublished || moment.utc(source.datePublished).year()})</span>
  }

  renderTitle() {
    let source = this.props.source;
    if (!source.titleOfPublication && !source.titleOfWork) {
      return '';
    }

    let titleOfWork = source.titleOfWork ? <span key="titleOfWork" style={{ fontStyle: source.titleOfPublication ? 'normal' : 'italic' }}>{source.titleOfWork}</span> : '';
    let titleOfPublication = source.titleOfPublication ? <span key="titleOfPublication" style={{ fontStyle: 'italic' }}>{source.titleOfPublication}</span> : '';
    let volumeNumber = source.volumeNumber ? <span key="volumeNumber" style={{ fontStyle: 'italic' }}>{source.volumeNumber}</span> : '';
    let issueNumber = source.issueNumber ? <span key="issueNumber">({source.issueNumber})</span> : '';
    let volumeIssue = titleOfPublication && volumeNumber ? this.join([volumeNumber, issueNumber], ' ') : '';
    let pageRange = source.pageRange ? <span key="pageRange">{source.pageRange}</span> : '';

    let title2 = this.join([titleOfPublication, volumeIssue, pageRange], ', ');

    return this.join([titleOfWork, title2], '. ');
  }

  renderPublisher() {
    let source = this.props.source;
    let text = source.location && source.publisher ? [source.location, source.publisher].join(': ') : source.location || source.publisher;
    return text ? <span key="publisher">{text}</span> : '';
  }

  renderUrl() {
    let source = this.props.source;
    return source.url ? <span key="url">{`Retrieved from: ${source.url}`}</span> : '';
  }

  render() {
    let author = this.renderAuthor();
    let date = this.renderDate();
    let title = this.renderTitle();
    let publisher = this.renderPublisher();
    let url = this.renderUrl();

    return (
      <div>
        {this.join([author, date, title, publisher, url], '. ')}
      </div>
    )
  }
}

ApaCitation.propTypes = {
  source: PropTypes.object
};

export default ApaCitation;
