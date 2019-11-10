
class CitationMeaningLink {
  constructor(entity = {}) {
    this.id = entity.id;
    this.meaningId = entity.meaningId;
    this.citationId = entity.citationId;
  }
}

module.exports = CitationMeaningLink;
