
class MeaningDisplay {
  constructor(entity = {}) {
    this.id = entity.id;
    this.entryId = entity.entryId;
    this.meaningId = entity.meaningId;
    this.sortOrder = entity.sortOrder;
    this.listLabel = entity.listLabel;
    this.canadianismType = entity.canadianismType;
    this.canadianismTypeComment = entity.canadianismTypeComment;
  }
}

module.exports = MeaningDisplay;
