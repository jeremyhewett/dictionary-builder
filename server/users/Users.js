const _ = require('lodash');
const express = require('express');
const helpers = require('../helpers');
const Database = require('../database/Database');
const Auth = require('../auth/Auth');
const User = require('../database/types/User');
const UserRoleLink = require('../database/types/UserRoleLink');
const Role = require('../database/types/Role');

class Users {
  constructor(config = {}) {
    this._db = new Database();
    let auth = new Auth(config);
    this.router = express.Router();
    this.router.get('/', auth.authorize('admin', this.bind(this.getUsers)));
    this.router.get('/:id', auth.authorize('admin', this.bind(this.getUser)));
    this.router.post('/:id', auth.authorize('admin', this.bind(this.createUser)));
    this.router.put('/:id', auth.authorize('admin', this.bind(this.updateUser)));
  }

  bind(fn) {
    return async (req, res, next) => {
      try {
        return await fn.apply(this, [req, res]);
      } catch(err) {
        next(err);
      }
    };
  }

  async getUsers(req, res) {
    let users = await this._db.query(new User());
    let roles = await this._db.scan(new Role());
    let userIds = users.map(user => user.id);
    let userRoleLinks = await this._db.query(new UserRoleLink({ userId: userIds }));
    let data = users.map(helpers.toJsonApi);
    data.forEach(user => {
      let roleLinks = userRoleLinks.filter(link => link.userId === user.id);
      user.relationships = {
        roles: roleLinks
          .map(link => roles.find(role => role.id === link.roleId))
          .filter(role => role)
          .map(role => role.name)
      }
    });

    res.json({ data });
  }

  async getUser(req, res) {
    let id = req.params.id;
    let user = await this._db.get(new User({ id }));
    let data = helpers.toJsonApi(user);
    res.json({ data });
  }

  async createUser(req, res) {
    let { data } = req.body;
    let user = Object.assign(new User(data.attributes));
    user = await this._db.create(user);
    res.json({ data: helpers.toJsonApi(user) });
  }

  async updateUser(req, res) {
    let { data } = req.body;
    let user = Object.assign(new User(data.attributes), { id: req.params.id });
    user = await this._db.update(new User({ id: req.params.id }), user);
    res.json({ data: helpers.toJsonApi(user) });
  }
}

module.exports = Users;
