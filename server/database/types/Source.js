
class Source {
  constructor(entity = {}) {
    this.id = entity.id;
    this.mediumId = entity.mediumId;
    this.genreId = entity.genreId;
    this.authorId = entity.authorId;
    this.yearPublished = entity.yearPublished;
    this.datePublished = entity.datePublished;
    this.titleOfWork = entity.titleOfWork;
    this.titleOfPublication = entity.titleOfPublication; // utterance: broadcast
    this.location = entity.location;
    this.publisher = entity.publisher; //utterance: media
    this.volumeNumber = entity.volumeNumber;
    this.issueNumber = entity.issueNumber;
    this.pageRange = entity.pageRange;
    this.url = entity.url;
  }
}

module.exports = Source;
