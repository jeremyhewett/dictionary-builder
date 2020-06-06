
class RelatedMeaningDisplay {
  constructor(entity = {}) {
    this.id = entity.id;
    this.fromMeaningDisplayId = entity.fromMeaningDisplayId;
    this.toMeaningDisplayId = entity.toMeaningDisplayId;
    this.linkNote = entity.linkNote;
  }
}

module.exports = RelatedMeaningDisplay;
