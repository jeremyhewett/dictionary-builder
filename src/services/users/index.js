import graphqlApi from 'services/graphqlApi';

const userFields = `
  id
  firstName
  lastName
  email
  isActive
  createdAt
  userRoles {
    id
    role {
      id
      name
    }
  }
`;

class CreateUserQuery {
  constructor(user) {
    this.key = `user`;
    this.type = 'UserInput!';
    this.args = { [this.key]: user };
  }

  toString() {
    return `createUser(input: $${this.key}) {
      ${userFields}
    }`;
  }
}

class UpdateUserQuery {
  constructor(user) {
    this.key = `user${user.id}`;
    this.type = 'UserInput!';
    this.args = { [this.key]: user };
  }

  toString() {
    return `updateUser(input: $${this.key}) {
      ${userFields}
    }`;
  }
}

class CreateUserRoleQuery {
  constructor(userRole) {
    this.key = `userRole${userRole.roleId}`;
    this.type = 'UserRoleInput!';
    this.args = { [this.key]: userRole };
  }

  toString() {
    return `${this.key}: createUserRole(input: $${this.key}) {
      id
      userId
      roleId
    }`;
  }
}

class DeleteUserRoleQuery {
  constructor(id) {
    this.key = `userRoleId${id}`;
    this.type = 'ID!';
    this.args = { [this.key]: id };
  }

  toString() {
    return `${this.key}: deleteUserRole(id: $${this.key})`;
  }
}

class DeleteUserQuery {
  constructor(id) {
    this.key = `userId${id}`;
    this.type = 'ID!';
    this.args = { [this.key]: id };
  }

  toString() {
    return `${this.key}: deleteUser(id: $${this.key})`;
  }
}

const combineQueries = (queries) => {
  let query = `mutation(${queries.map(q => `$${q.key}: ${q.type}`)}) {
    ${queries.join('\n')}
  }`;
  let args = Object.assign({}, ...queries.map(q => q.args));
  return { query, args };
};

const getUsers = async (skip, limit) => {
  let query = `{
    users {
      ${userFields}
    }
  }`;
  return (await graphqlApi.query(query)).users;
};

const getUser = async (userId) => {
  let query = `query($userId: ID!) {
    user(id: $userId) {
      ${userFields}
    }
  }`;
  return (await graphqlApi.query(query, { userId })).user;
};

const getRoles = async () => {
  let query = `{
    roles {
      id
      name
    }
  }`;
  return (await graphqlApi.query(query)).roles;
};

const createUser = async (user) => {
  let queries = [
    new CreateUserQuery(new User({ ...user, passwordHash: user.password })),
    ...user.userRoles.map(ur => new CreateUserRoleQuery({ userId: '$createUser.id', roleId: ur.role.id }))
  ];
  let { query, args } = combineQueries(queries);
  return await graphqlApi.query(query, args);
};

const updateUser = async (user, oldUser) => {
  let newRoles = user.userRoles.filter(ur => !oldUser.userRoles.some(our => our.role.id === ur.role.id));
  let removedRoles = oldUser.userRoles.filter(our => !user.userRoles.some(ur => ur.role.id === our.role.id));
  let queries = newRoles.map(userRole => new CreateUserRoleQuery({ userId: user.id, roleId: userRole.role.id }))
    .concat(removedRoles.map(userRole => new DeleteUserRoleQuery(userRole.id)))
    .concat([new UpdateUserQuery(new User(user))]);
  let query = `mutation(${queries.map(q => `$${q.key}: ${q.type}`)}) {
    ${queries.join('\n')}
  }`;
  let args = Object.assign({}, ...queries.map(q => q.args));
  return await graphqlApi.query(query, args);
};

const deleteUsers = async (users) => {
  let deleteUserRoleQueries = users
    .reduce((userRoles, user) => userRoles.concat(user.userRoles), [])
    .map(userRole => new DeleteUserRoleQuery(userRole.id));
  let deleteUserQueries = users.map(user => new DeleteUserQuery(user.id));
  let { query, args } = combineQueries(deleteUserRoleQueries.concat(deleteUserQueries));
  return await graphqlApi.query(query, args);
};

export default { getUsers, getUser, getRoles, createUser, updateUser, deleteUsers };

class User {
  constructor(entity = {}) {
    this.id = entity.id;
    this.isActive = entity.isActive;
    this.firstName = entity.firstName;
    this.lastName = entity.lastName;
    this.email = entity.email;
    this.passwordHash = entity.passwordHash;
    this.createdAt = entity.createdAt;
  }
}
