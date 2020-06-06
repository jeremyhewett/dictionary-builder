const moment = require('moment');
const Source = require('../../server/database/types/Source');

class DchpSource {
  static get table() { return 'source'; }

  constructor(entity = {}) {
    this.id = entity.id;
    this.typeId = entity.typeId;
    this.yearPublished = entity.yearPublished;
    this.page = entity.page;
    this.authorId = entity.authorId;
    this.titleId = entity.titleId;
    this.placeId = entity.placeId;
    this.url = entity.url;
    this.urlAccessDate = entity.urlAccessDate;
    this.dateline = entity.dateline;
    this.periodicalDate = entity.periodicalDate;
    this.yearComposed = entity.yearComposed;
    this.publisher = entity.publisher;
    this.uttered = entity.uttered;
    this.utteranceWitness = entity.utteranceWitness;
    this.utteranceTime = entity.utteranceTime;
    this.utteranceMedia = entity.utteranceMedia;
    this.utteranceBroadcast = entity.utteranceBroadcast;
    this.volumeIssue = entity.volumeIssue;
    this.editor = entity.editor;
    this.evidence = entity.evidence;
    this.isDchp1 = entity.isDchp1;
    this.isTeach = entity.isTeach;
  }

  toSource(dchpAuthor, dchpTitle, dchpPlace) {
    let sourceTypes = ['book', 'periodical', 'website', 'utterance'];
    switch (sourceTypes[this.typeId]) {
      case 'book': return this.toBook(dchpAuthor, dchpTitle, dchpPlace);
      case 'periodical': return this.toPeriodical(dchpAuthor, dchpTitle, dchpPlace);
      case 'website': return this.toWebsite(dchpAuthor, dchpTitle, dchpPlace);
      case 'utterance': return this.toUtterance(dchpAuthor, dchpTitle, dchpPlace);
    }
  }

  toBook(author, title, place) {
    return new Source({
      sourceType: 'book',
      datePublished: this.yearPublished ? moment(this.yearPublished, "YYYY").toJSON() : null,
      dateComposed: this.yearComposed ? moment(this.yearComposed, "YYYY").toJSON() : null,
      author: (author && author.name) || null,
      editor: this.editor || null,
      title: (title && title.name) || null,
      location: (place && place.name) || null,
      publisher: this.publisher || null,
      url: this.url || null,
      urlAccessedAt: this.urlAccessDate ? moment(this.urlAccessDate, "D MMM. YYYY").toJSON() : null,
      page: this.page || null,
      issue: null,
      evidence: null
    });
  }

  toPeriodical(author, title, place) {
    return new Source({
      sourceType: 'periodical',
      datePublished: this.periodicalDate ? moment(this.periodicalDate, "D MMM. YYYY").toJSON() : null,
      dateComposed: null,
      author: (author && author.name) || null,
      editor: this.editor,
      title: (title && title.name) || null,
      location: (place && place.name) || null,
      publisher: this.publisher || null,
      url: this.url || null,
      urlAccessedAt: this.urlAccessDate ? moment(this.urlAccessDate, "D MMM. YYYY").toJSON() : null,
      page: this.page || null,
      issue: null,
      evidence: null
    });
  }

  toWebsite(author, title, place) {
    return new Source({
      sourceType: 'website',
      datePublished: this.periodicalDate ? moment(this.periodicalDate, 'D MMM. YYYY').toJSON() : this.yearPublished ? moment(this.yearPublished, "YYYY").toJSON() : null,
      dateComposed: null,
      author: (author && author.name) || null,
      editor: null,
      title: (title && title.name) || null,
      location: (place && place.name) || null,
      publisher: null,
      url: this.url || null,
      urlAccessedAt: this.urlAccessDate ? moment(this.urlAccessDate, "D MMM. YYYY").toJSON() : null,
      page: this.page || null,
      issue: null,
      evidence: this.evidence || null
    });
  }

  toUtterance(author, title, place) {
    return new Source({
      sourceType: 'utterance',
      datePublished: this.periodicalDate ? moment(this.periodicalDate, 'D MMM. YYYY').toJSON() : this.yearPublished ? moment(this.yearPublished, "YYYY").toJSON() : null,
      dateComposed: null,
      author: (author && author.name) || null,
      editor: null,
      title: this.utteranceBroadcast || null,
      location: (place && place.name) || null,
      publisher: this.utteranceMedia || null,
      url: this.url || null,
      urlAccessedAt: this.urlAccessDate ? moment(this.urlAccessDate, "D MMM. YYYY").toJSON() : null,
      page: null,
      issue: null,
      evidence: this.utteranceWitness
    });
  }
}

module.exports = DchpSource;
