
class Website {
  constructor(entity = {}) {
    this.id = entity.id;
    this.citationId = entity.citationId;
    this.publishedDate = entity.publishedDate;
    this.author = entity.author;
    this.title = entity.title;
    this.place = entity.place;
    this.url = entity.url;
    this.urlAccessedAt = entity.urlAccessedAt;
    this.evidence = entity.evidence;
  }
}

module.exports = Website;
