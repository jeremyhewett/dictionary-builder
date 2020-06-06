
class DchpPlace {
  static get table() { return 'place'; }

  constructor(entity = {}) {
    this.id = entity.id;
    this.name = entity.name;
    this.isDchp1 = entity.isDchp1;
    this.isTeach = entity.isTeach;
  }
}

module.exports = DchpPlace;
