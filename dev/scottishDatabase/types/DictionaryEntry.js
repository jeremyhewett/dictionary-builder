
class DictionaryEntry {
  static get table() { return 'tbl_dictionary_entry'; }

  constructor(entity = {}) {
    this.dictionaryEntryId = entity.dictionaryEntryId;
    this.keyword = entity.keyword;
    this.dictionary = entity.dictionary;
    this.headwordIdentifier = entity.headwordIdentifier;
    this.homonymNo = entity.homonymNo;
    this.sense = entity.sense;
  }
}

module.exports = DictionaryEntry;
