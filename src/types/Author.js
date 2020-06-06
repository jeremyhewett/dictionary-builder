
export default class Author {
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

  initials() {
    return this.forenames
      .split(' ')
      .map(n => n.trim().substr(0, 1).toUpperCase())
      .join('.');
  }
}
