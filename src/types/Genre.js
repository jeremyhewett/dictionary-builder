
class Genre {
  constructor(entity = {}) {
    this.id = entity.id;
    this.name = entity.name;
  }
}

module.exports = Genre;

/*
this.editor = entity.editor;
this.urlAccessedAt = entity.urlAccessedAt;
this.evidence = entity.evidence; //utterance: witness
*/