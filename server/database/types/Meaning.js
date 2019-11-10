
class Meaning {
  constructor(entity = {}) {
    this.id = entity.id;
    this.entryId = entity.entryId;
    this.partOfSpeech = entity.partOfSpeech;
    this.definition = entity.definition;
    this.orderNum = entity.orderNum;
    this.orderLetter = entity.orderLetter;
    this.usage = entity.usage;
    this.canadianismType = entity.canadianismType;
    this.canadianismTypeComment = entity.canadianismTypeComment;
    this.order = entity.order;
    this.dagger = entity.dagger;
  }
}

module.exports = Meaning;
