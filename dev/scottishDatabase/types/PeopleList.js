
class PeopleList {
  static get table() { return 'tbl_people_list'; }

  constructor(entity = {}) {
    this.personListId = entity.personListId;
    this.person = entity.person;
    this.referencedFrom = entity.referencedFrom;
    this.referenceId = entity.referenceId;
    this.editor = entity.editor;
    this.personOrder = entity.personOrder;
  }
}

module.exports = PeopleList;
