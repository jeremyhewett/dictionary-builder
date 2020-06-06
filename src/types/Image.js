
class Image {
  constructor(entity = {}) {
    this.id = entity.id;
    this.entryId = entity.entryId;
    this.caption = entity.caption;
    this.path = entity.path;
    this.scale = entity.scale;
    this.sortOrder = entity.sortOrder;
  }
}

module.exports = Image;
