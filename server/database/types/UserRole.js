
class UserRole {
  constructor(entity = {}) {
    this.id = entity.id;
    this.userId = entity.userId;
    this.roleId = entity.roleId;
  }
}

module.exports = UserRole;
