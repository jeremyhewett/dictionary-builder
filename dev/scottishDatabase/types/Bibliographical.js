const moment = require('moment');
const Source = require('../../../server/database/types/Source');

class Bibliographical {
  static get table() { return 'tbl_bibliographical'; }

  constructor(entity = {}) {
    this.bibliographicalId = entity.bibliographicalId;
    this.sourceTitle = entity.sourceTitle;
    this.sourceTitle2 = entity.sourceTitle2;
    this.publication = entity.publication;
    this.dateOfCompositionExact = entity.dateOfCompositionExact;
    this.dateOfCompositionDescriptive = entity.dateOfCompositionDescriptive;
    this.pageRange = entity.pageRange;
    this.miscInfo = entity.miscInfo;
  }
  
  toSource(publication, author, medium, genre) {
    return new Source({
      mediumId: medium.id,
      genreId: genre && genre.id,
      authorId: author && author.id,
      yearPublished: null,
      datePublished: publication.dateOfPublicationExact && moment.utc(publication.dateOfPublicationExact).toJSON(),
      titleOfWork: this.sourceTitle === publication.title ? null : this.sourceTitle,
      titleOfPublication: publication.title,
      location: publication.placeOfPublication,
      publisher: publication.publisher, //utterance: media
      volumeNumber: publication.volumeNumber,
      issueNumber: publication.issueNumber,
      pageRange: this.pageRange,
      url: null,
    });
  }
}

module.exports = Bibliographical;
