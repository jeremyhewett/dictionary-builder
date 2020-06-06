const moment = require('moment');
const Citation = require('../../../server/database/types/Citation');

class Quotation {
  static get table() { return 'tbl_quotation'; }

  constructor(entity = {}) {
    this.quotationId = entity.quotationId;
    this.quotation = entity.quotation;
    this.sourceType = entity.sourceType;
    this.personalSource = entity.personalSource;
    this.bibliographicSource = entity.bibliographicSource;
    this.quotationMisc = entity.quotationMisc;
    this.dateKeyed = entity.dateKeyed;
    this.reportedBy = entity.reportedBy;
    this.dateOfQuotationExact = entity.dateOfQuotationExact;
    this.dateOfQuotationDescriptive = entity.dateOfQuotationDescriptive;
    this.pageNumber = entity.pageNumber;
    this.partNumber = entity.partNumber;
    this.volumeNumber = entity.volumeNumber;
    this.citationLocation = entity.citationLocation;
  }
  
  toCitation(meaning, source, user) {
    return new Citation({
      meaningId: meaning.id,
      userId: user.id,
      spellingVariantId: null,
      text: this.quotation,
      createdAt: moment().toJSON(),
      modifiedAt: null,
      modifiedUserId: user.id,
      legacyId: null,
      isIncomplete: true,
      memo: null,
      clipStart: 0,
      clipEnd: this.quotation.length - 1,
      clippedText: this.quotation,
      sourceId: source.id,
    });
  }
}

module.exports = Quotation;
