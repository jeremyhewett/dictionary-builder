
class User {
  constructor(entity = {}) {
    this.id = entity.id;
    this.isActive = entity.isActive;
    this.firstName = entity.firstName;
    this.lastName = entity.lastName;
    this.email = entity.email;
    this.passwordHash = entity.passwordHash;
  }
}

module.exports = User;
