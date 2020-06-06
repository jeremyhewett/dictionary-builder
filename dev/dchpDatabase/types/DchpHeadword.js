
class DchpHeadword {
  static get table() { return 'headword'; }

  constructor(entity = {}) {
    this.id = entity.id;
    this.headword = entity.headword;
    this.isDchp1 = entity.isDchp1;
    this.isTeach = entity.isTeach;
  }
}

module.exports = DchpHeadword;
