const Author = require('../../../server/database/types/Author');

class Person {
  static get table() { return 'tbl_people'; }

  constructor(entity = {}) {
    this.personId = entity.personId;
    this.lastName = entity.lastName;
    this.forenames = entity.forenames;
    this.title = entity.title;
    this.fullname = entity.fullname;
    this.sex = entity.sex;
    this.decadeOfBirth = entity.decadeOfBirth;
    this.education = entity.education;
    this.occupation = entity.occupation;
    this.placeOfBirth = entity.placeOfBirth;
  }
  
  toAuthor() {
    return new Author({
      surname: this.lastName,
      forenames: this.forenames,
      title: this.title,
      yearOfBirth: parseInt(this.decadeOfBirth),
      education: this.education,
      occupation: this.occupation,
      placeOfBirth: this.placeOfBirth
    });
  }
}

module.exports = Person;
