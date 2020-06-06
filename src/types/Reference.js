
class Reference {
  constructor(entity = {}) {
    this.id = entity.id;
    this.shortDisplay = entity.shortDisplay;
    this.referenceText = entity.referenceText;
  }
}

module.exports = Reference;
