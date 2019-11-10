
class Periodical {
  constructor(entity = {}) {
    this.id = entity.id;
    this.citationId = entity.citationId;
    this.author = entity.author;
    this.title = entity.title;
    this.place = entity.place;
    this.issue = entity.issue;
    this.issueDate = entity.issueDate;
    this.issueDateTimezone = entity.issueDateTimezone;
    this.url = entity.url;
    this.urlAccessedAt = entity.urlAccessedAt;
    this.page = entity.page;
  }
}

module.exports = Periodical;
