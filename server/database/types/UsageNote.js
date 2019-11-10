
class UsageNote {
  constructor(entity = {}) {
    this.id = entity.id;
    this.meaningId = entity.meaningId;
    this.text = entity.text;
  }
}

module.exports = UsageNote;
