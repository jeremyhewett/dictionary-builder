const express = require('express');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');
const helpers = require('../helpers');
const db = require('../database/db');
const User = require('../database/types/User');
const UserRole = require('../database/types/UserRole');
const Role = require('../database/types/Role');

class Auth {
  constructor(config = {}) {
    this._db = db;
    this._secret = config.app.secret;
    this._tokenTtl = config.app.tokenTtl;
    this.authenticator = this._authenticator.bind(this);
    this.router = express.Router();
    this.router.put('/login', this.login.bind(this));
    this.router.put('/logout', this.logout.bind(this));
    this.router.get('/user', this.getUser.bind(this));
  }

  async _roles() {
    let roles = this.roles || await this._db.query(new Role());
    this.roles = roles;
    return roles;
  }

  async login(req, res) {
    let email = req.body.data.email;
    let password = req.body.data.password;

    let user = await this._getUser(email);
    if (!user || !user.isActive) {
      res.sendStatus(401);
      return;
    }

    let match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      res.sendStatus(401);
      return;
    }

    let csrfToken = uuidv4();
    let authToken = jwt.sign({ csrfToken }, this._secret, {
      subject: user.email,
      expiresIn: this._tokenTtl
    });

    res.append('Set-Cookie', `CSRF-TOKEN=${csrfToken}; Path=/;`);
    res.append('Set-Cookie', `AUTH-TOKEN=${authToken}; Path=/; HttpOnly`);

    res.json({ data: helpers.toJsonApi(user) });
  }

  async logout(req, res) {
    res.append('Set-Cookie', `CSRF-TOKEN=; Path=/;`);
    res.append('Set-Cookie', `AUTH-TOKEN=; Path=/; HttpOnly`);
    res.sendStatus(200);
  }

  async getUser(req, res) {
    res.json({ data: req.user ? helpers.toJsonApi(req.user) : null });
  }

  async _authenticator(req, res, next) {
    let token;
    let isCookieToken = false;

    if (req.headers['authorization']) {
      let authToken = req.headers['authorization'].substr('Bearer '.length);
      try {
        token = jwt.verify(authToken, this._secret);
      } catch {
        res.sendStatus(401);
        return;
      }
    } else if (req.cookies['AUTH-TOKEN']) {
      try {
        token = jwt.verify(req.cookies['AUTH-TOKEN'], this._secret);
      } catch {
        res.append('Set-Cookie', `AUTH-TOKEN=; Path=/; HttpOnly`);
        next();
        return;
      }
      if (req.headers['x-csrf-token'] !== token.csrfToken) {
        res.append('Set-Cookie', `AUTH-TOKEN=; Path=/; HttpOnly`);
        res.sendStatus(401);
        return;
      }
      isCookieToken = true;
    } else {
      next();
      return;
    }

    let user = await this._getUser(token.sub);
    if (!user || !user.isActive) {
      res.sendStatus(401);
      return;
    }

    req.user = user;

    if (isCookieToken) {
      //Extend token expiry
      let newToken = jwt.sign({ csrfToken: token.csrfToken }, this._secret, {
        subject: token.sub,
        expiresIn: this._tokenTtl
      });
      res.append('Set-Cookie', `AUTH-TOKEN=${newToken}; Path=/; HttpOnly`);
    }

    next();
  }

  authorize(roles, handler) {
    if (arguments.length === 1 && typeof roles === 'function') {
      handler = roles;
      roles = undefined;
    }

    if (typeof roles === 'string') {
      roles = [roles];
    }

    return (req, res, next) => {
      if (req.user) {
        if (typeof roles === 'undefined' || roles.some(role => req.user.roles.includes(role))) {
          handler(req, res, next);
        } else {
          res.sendStatus(403);
        }
      } else {
        res.sendStatus(401);
      }
    }
  }

  async _getUser(email) {
    let user = await this._db.get(new User({ email }));
    if (user && user.isActive) {
      let userRoleLinks = await this._db.query(new UserRole({ userId: user.id }));
      let roles = await this._roles();
      user.roles = userRoleLinks
        .map(link => roles.find(role => role.id === link.roleId))
        .filter(role => role)
        .map(role => role.name);
    }
    return user;
  }
}

module.exports = Auth;
