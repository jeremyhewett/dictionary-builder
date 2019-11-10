
class MeaningEntryLink {
  constructor(entity = {}) {
    this.id = entity.id;
    this.meaningId = entity.meaningId;
    this.entryId = entity.entryId;
    this.linkNote = entity.linkNote;
  }
}

module.exports = MeaningEntryLink;
