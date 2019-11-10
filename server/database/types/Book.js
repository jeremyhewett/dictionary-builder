
class Book {
  constructor(entity = {}) {
    this.id = entity.id;
    this.citationId = entity.citationId;
    this.yearPublished = entity.yearPublished;
    this.yearComposed = entity.yearComposed;
    this.author = entity.author;
    this.editor = entity.editor;
    this.title = entity.title;
    this.place = entity.place;
    this.publisher = entity.publisher;
    this.url = entity.url;
    this.urlAccessedAt = entity.urlAccessedAt;
    this.page = entity.page;
  }
}

module.exports = Book;
