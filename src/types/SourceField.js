
class SourceField {
  constructor(entity = {}) {
    this.id = entity.id;
    this.name = entity.name;
    this.label = entity.label;
  }
}

module.exports = SourceField;

/*
this.editor = entity.editor;
this.urlAccessedAt = entity.urlAccessedAt;
this.evidence = entity.evidence; //utterance: witness
*/
