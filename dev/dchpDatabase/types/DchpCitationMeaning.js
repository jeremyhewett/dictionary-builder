
class DchpCitationMeaning {
  static get table() { return 'det_citations_meanings'; }

  constructor(entity = {}) {
    this.meaningId = entity.meaningId;
    this.citationId = entity.citationId;
  }
}

module.exports = DchpCitationMeaning;
