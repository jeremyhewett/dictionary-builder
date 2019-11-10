const Book = require('./Book');
const Periodical = require('./Periodical');
const Website = require('./Website');
const Utterance = require('./Utterance');

class Citation {
  constructor(entity = {}) {
    this.id = entity.id;
    this.headwordId = entity.headwordId;
    this.createdAt = entity.createdAt;
    this.shortMeaning = entity.shortMeaning;
    this.partOfSpeech = entity.partOfSpeech;
    this.spellingVariant = entity.spellingVariant;
    this.text = entity.text;
    this.userId = entity.userId;
    this.modifiedAt = entity.modifiedAt;
    this.modifiedUserId = entity.modifiedUserId;
    this.legacyId = entity.legacyId;
    this.isIncomplete = entity.isIncomplete;
    this.memo = entity.memo;
    this.clipStart = entity.clipStart;
    this.clipEnd = entity.clipEnd;
    this.clippedText = entity.clippedText;
    this.sourceType = entity.sourceType;
  }

  source() {
    switch (this.sourceType) {
      case 'books': return new Book({ id: this.bookId });
      case 'periodicals': return new Periodical({ id: this.periodicalId });
      case 'websites': return new Website({ id: this.websiteId });
      case 'utterances': return new Utterance({ id: this.utteranceId });
    }
  }
}

module.exports = Citation;
