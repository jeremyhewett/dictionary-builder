
class Meaning {
  constructor(entity = {}) {
    this.id = entity.id;
    this.headwordId = entity.headwordId;
    this.partOfSpeech = entity.partOfSpeech;
    this.usage = entity.usage;
    this.shortMeaning = entity.shortMeaning;
    this.definition = entity.definition;
    this.isArchaic = entity.isArchaic;
  }
}

module.exports = Meaning;
