
class Publication {
  static get table() { return 'tbl_publication'; }

  constructor(entity = {}) {
    this.publicationId = entity.publicationId;
    this.title = entity.title;
    this.medium = entity.medium;
    this.dateOfPublicationExact = entity.dateOfPublicationExact;
    this.dateOfPublicationDescriptive = entity.dateOfPublicationDescriptive;
    this.editionNumber = entity.editionNumber;
    this.dateOfEditionExact = entity.dateOfEditionExact;
    this.dateOfCompositionExact = entity.dateOfCompositionExact;
    this.seriesTitle = entity.seriesTitle;
    this.issueIdentifier = entity.issueIdentifier;
    this.publisher = entity.publisher;
    this.placeOfPublication = entity.placeOfPublication;
    this.ISBN = entity.ISBN;
  }
}

module.exports = Publication;
