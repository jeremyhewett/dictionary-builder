
class Citation {
  constructor(entity = {}) {
    this.id = entity.id;
    this.meaningId = entity.meaningId;
    this.userId = entity.userId;
    this.spellingVariantId = entity.spellingVariantId;
    this.text = entity.text;
    this.createdAt = entity.createdAt;
    this.modifiedAt = entity.modifiedAt;
    this.modifiedUserId = entity.modifiedUserId;
    this.legacyId = entity.legacyId;
    this.isIncomplete = entity.isIncomplete;
    this.memo = entity.memo;
    this.clipStart = entity.clipStart;
    this.clipEnd = entity.clipEnd;
    this.clippedText = entity.clippedText;
    this.sourceId = entity.sourceId;
  }
}

module.exports = Citation;
