
class SpellingVariant {
  constructor(entity = {}) {
    this.id = entity.id;
    this.headwordId = entity.headwordId;
    this.spellingVariant = entity.spellingVariant;
  }
}

module.exports = SpellingVariant;
