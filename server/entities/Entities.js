const express = require('express');
const db = require('../database/db');
const Auth = require('../auth/Auth');
const Meaning = require('../database/types/Meaning');

class Entities {
  constructor(config = {}) {
    this._db = db;
    let auth = new Auth(config);
    this.router = express.Router();
    this.router.put('/meanings/:id', auth.authorize('editor', this.updateMeaning.bind(this)));
  }

  async updateMeaning(req, res) {
    let meaning = await this._db.update(new Meaning({ id: req.params.id }), new Meaning(req.body.data.attributes));
    res.json({ meaning });
  }
}

module.exports = Entities;
