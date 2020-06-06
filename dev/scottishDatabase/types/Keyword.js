const Headword = require('../../../server/database/types/Headword');
const Meaning = require('../../../server/database/types/Meaning');

class Keyword {
  static get table() { return 'tbl_keyword'; }

  constructor(entity = {}) {
    this.keywordId = entity.keywordId;
    this.keyword = entity.keyword;
    this.quotation = entity.quotation;
    this.basicPartOfSpeech = entity.basicPartOfSpeech;
    this.grammar = entity.grammar;
    this.notes = entity.notes;
    this.definition = entity.definition;
  }

  toHeadword() {
    return new Headword({
      headword: this.keyword
    });
  }
  
  toMeaning(headword) {
    return new Meaning({
      headwordId: headword.id,
      partOfSpeech: this.toPartOfSpeech(),
      usage: null,
      shortMeaning: this.definition,
      definition: null,
      isArchaic: false,
    });
  }

  toPartOfSpeech() {
    return this.basicPartOfSpeech === 'prop. n.' ? 'properNoun' : this.basicPartOfSpeech;
  }

  toMeaningString() {
    return `${this.toPartOfSpeech()} ${this.definition}`;
  }
}

module.exports = Keyword;
