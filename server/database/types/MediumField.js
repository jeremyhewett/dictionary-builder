
class MediumField {
  constructor(entity = {}) {
    this.id = entity.id;
    this.mediumId = entity.mediumId;
    this.sourceFieldId = entity.sourceFieldId;
  }
}

module.exports = MediumField;

/*
this.editor = entity.editor;
this.urlAccessedAt = entity.urlAccessedAt;
this.evidence = entity.evidence; //utterance: witness
*/
