const express = require('express');
const Database = require('../database/Database');
const Auth = require('../auth/Auth');
const Content = require('../database/types/Content');

class ContentHandler {
  constructor(config = {}) {
    this._db = new Database();
    this._auth = new Auth(config);
    this.router = express.Router();
    this.router.get('/:section', this.getSection.bind(this));
    this.router.put('/:section', this._auth.authorize('admin', this.updateSection.bind(this)));
  }

  async getSection(req, res) {
    let section = req.params.section;
    let content = await this._db.get(new Content({ section }));
    res.json({
      data: {
        id: section,
        type: 'contents',
        attributes: {
          text: content.text
        }
      }
    });
  }

  async updateSection(req, res) {
    let section = req.params.section;
    let content = await this._db.get(new Content({ section }));
    content = await this._db.update(content, { text: req.body.data.attributes.text });
    res.json({
      data: {
        id: section,
        type: 'contents',
        attributes: {
          text: content.text
        }
      }
    });
  }
}

module.exports = ContentHandler;
