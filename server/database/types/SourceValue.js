
class SourceValue {
  constructor(entity = {}) {
    this.id = entity.id;
    this.sourceId = entity.sourceId;
    this.sourceFieldId = entity.sourceFieldId;
    this.value = entity.value;
  }
}

module.exports = SourceValue;

/*
this.editor = entity.editor;
this.urlAccessedAt = entity.urlAccessedAt;
this.evidence = entity.evidence; //utterance: witness
*/
