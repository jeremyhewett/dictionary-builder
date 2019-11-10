
class Content {
  constructor(entity = {}) {
    this.id = entity.id;
    this.section = entity.section;
    this.text = entity.text;
  }
}

module.exports = Content;
