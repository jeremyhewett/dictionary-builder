const moment = require('moment');
const Citation = require('../../server/database/types/Citation');

class DchpCitation {
  static get table() { return 'citation'; }

  constructor(entity = {}) {
    this.id = entity.id;
    this.created = entity.created;
    this.shortMeaning = entity.shortMeaning;
    this.partOfSpeech = entity.partOfSpeech;
    this.spellingVariant = entity.spellingVariant;
    this.text = entity.text;
    this.headwordId = entity.headwordId;
    this.sourceId = entity.sourceId;
    this.userId = entity.userId;
    this.lastModified = entity.lastModified;
    this.lastModifiedUserId = entity.lastModifiedUserId;
    this.legacyId = entity.legacyId;
    this.isIncomplete = entity.isIncomplete;
    this.memo = entity.memo;
    this.isDchp1 = entity.isDchp1;
    this.isTeach = entity.isTeach;
    this.clipStart = entity.clipStart;
    this.clipEnd = entity.clipEnd;
    this.clippedText = entity.clippedText;
  }

  toCitation(meaning, user, source, spellingVariants) {
    let spellingVariant = spellingVariants.find(x => x.spellingVariant === this.spellingVariant);
    return new Citation({
      meaningId: meaning.id,
      userId: user.id,
      spellingVariantId: spellingVariant ? spellingVariants.spellingVariant : null,
      text: this.text || null,
      createdAt: moment(this.created, "YYYY-MM-DD HH:mm:ss").toJSON(),
      modifiedAt: moment(this.lastModified, "YYYY-MM-DD HH:mm:ss").toJSON(),
      modifiedUserId: user.id,
      legacyId: this.legacyId,
      isIncomplete: !!this.isIncomplete,
      memo: this.memo || null,
      clipStart: this.clipStart,
      clipEnd: this.clipEnd,
      clippedText: this.clippedText || null,
      sourceId: (source && source.id) || null
    });
  }
}

module.exports = DchpCitation;
