
class Keyword {
  static get table() { return 'tbl_medium_genre_update'; }

  constructor(entity = {}) {
    this.pubId = entity.pubId;
    this.medium = entity.medium;
    this.genre = entity.genre;
    this.audience = entity.audience;
  }
}

module.exports = Keyword;
