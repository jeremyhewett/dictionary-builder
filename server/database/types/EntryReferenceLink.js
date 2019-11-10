
class EntryReferenceLink {
  constructor(entity = {}) {
    this.id = entity.id;
    this.entryId = entity.entryId;
    this.referenceId = entity.referenceId;
    this.svText = entity.svText;
    this.linkText = entity.linkText;
    this.linkTarget = entity.linkTarget;
    this.accessedAt = entity.accessedAt;
  }
}

module.exports = EntryReferenceLink;
