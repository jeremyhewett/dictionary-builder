
class Utterance {
  constructor(entity = {}) {
    this.id = entity.id;
    this.citationId = entity.citationId;
    this.yearRecorded = entity.yearRecorded;
    this.utteredBy = entity.utteredBy;
    this.utteranceDate = entity.utteranceDate;
    this.utteranceTime = entity.utteranceTime;
    this.media = entity.media;
    this.broadcast = entity.broadcast;
    this.place = entity.place;
    this.witness = entity.witness;
    this.url = entity.url;
    this.urlAccessedAt = entity.urlAccessedAt;
  }
}

module.exports = Utterance;
