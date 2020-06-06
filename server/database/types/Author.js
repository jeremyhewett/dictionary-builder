
class Author {
  constructor(entity = {}) {
    this.id = entity.id;
    this.surname = entity.surname;
    this.forenames = entity.forenames;
    this.title = entity.title;
    this.yearOfBirth = entity.yearOfBirth;
    this.education = entity.education;
    this.occupation = entity.occupation;
    this.placeOfBirth = entity.placeOfBirth;
  }
}

module.exports = Author;
