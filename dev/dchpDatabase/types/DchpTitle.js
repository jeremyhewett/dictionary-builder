
class DchpTitle {
  static get table() { return 'author'; }

  constructor(entity = {}) {
    this.id = entity.id;
    this.name = entity.name;
    this.shortName = entity.shortName;
    this.isDchp1 = entity.isDchp1;
    this.isTeach = entity.isTeach;
  }
}

module.exports = DchpTitle;
