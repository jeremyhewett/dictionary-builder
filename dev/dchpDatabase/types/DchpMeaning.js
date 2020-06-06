const Meaning = require('../../server/database/types/Meaning');
const MeaningDisplay = require('../../server/database/types/MeaningDisplay');

class DchpMeaning {
  static get table() { return 'det_meanings'; }

  constructor(entity = {}) {
    this.id = entity.id;
    this.entryId = entity.entryId;
    this.partofspeech = entity.partofspeech;
    this.definition = entity.definition;
    this.ordernum = entity.ordernum;
    this.orderletter = entity.orderletter;
    this.usage = entity.usage;
    //this.headword = entity.headword; //Not Used
    this.canadianismType = entity.canadianismType;
    this.canadianismTypeComment = entity.canadianismTypeComment;
    this.order = entity.order;
    this.dagger = entity.dagger;
  }

  toMeaning(headword, dchpCitations) {
    let dchpCitation = dchpCitations.find(x => x.shortMeaning);
    return new Meaning({
      headwordId: headword.id,
      partOfSpeech: this.partofspeech || null,
      usage: this.usage || null,
      shortMeaning: (dchpCitation && dchpCitation.shortMeaning) || null,
      definition: this.definition || null,
      isArchaic: !!this.dagger
    });
  }
  
  toMeaningDisplay(entry, meaning) {
    return new MeaningDisplay({
      entryId: entry.id,
      meaningId: meaning.id,
      sortOrder: this.order,
      listLabel: `${this.ordernum}${this.orderletter}` || null,
      canadianismType: this.canadianismType,
      canadianismTypeComment: this.canadianismTypeComment
    });
  }
}

module.exports = DchpMeaning;
