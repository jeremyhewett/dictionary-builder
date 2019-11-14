const _ = require('lodash');
const moment = require('moment');
const express = require('express');
const helpers = require('../helpers');
const Database = require('../database/Database');
const Auth = require('../auth/Auth');
const Headword = require('../database/types/Headword');
const Citation = require('../database/types/Citation');
const Book = require('../database/types/Book');
const Periodical = require('../database/types/Periodical');
const Website = require('../database/types/Website');
const Utterance = require('../database/types/Utterance');

class Citations {
  constructor(config = {}) {
    this._db = new Database();
    let auth = new Auth(config);
    this.router = express.Router();
    this.router.get('/', this.bind(this.getCitations));
    this.router.get('/:id', this.bind(this.getCitation));
    this.router.put('/:id', auth.authorize('editor', this.bind(this.updateCitation)));
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

  async getCitations(req, res) {
    res.sendStatus(404);
  }

  async getCitation(req, res) {
    let id = req.params.id;

    let citation = await this._db.get(new Citation({ id }));

    let [headword, books, periodicals, websites, utterances] = await Promise.all([
      this._db.get(new Headword({ id: citation.headwordId })),
      this._db.query(new Book({ citationId: citation.id })),
      this._db.query(new Periodical({ citationId: citation.id })),
      this._db.query(new Website({ citationId: citation.id })),
      this._db.query(new Utterance({ citationId: citation.id }))
    ]);

    let data = Object.assign(helpers.toJsonApi(citation), {
      relationships: {
        headword: helpers.toJsonApi(headword),
        book: books[0] && helpers.toJsonApi(books[0]),
        periodical: periodicals[0] && helpers.toJsonApi(periodicals[0]),
        website: websites[0] && helpers.toJsonApi(websites[0]),
        utterance: utterances[0] && helpers.toJsonApi(utterances[0]),
      }
    });

    res.json({ data });
  }

  async updateCitation(req, res) {
    let { data } = req.body;
    let citation = Object.assign(new Citation(data.attributes), { id: req.params.id });

    switch(data.attributes.sourceType) {
      case 'books':
        let book = data.relationships.book.id ?
          await this._db.update(new Book({ id: req.params.id }), data.relationships.book.attributes) :
          await this._db.create(new Book(data.relationships.book.attributes));
        data.relationships.book = helpers.toJsonApi(book);
        break;
      case 'periodicals':
        let periodical = data.relationships.periodical.id ?
          await this._db.update(new Periodical({ id: req.params.id }), data.relationships.periodical.attributes) :
          await this._db.create(new Periodical(data.relationships.periodical.attributes));
        data.relationships.periodical = helpers.toJsonApi(periodical);
        break;
      case 'utterances':
        let utterance = data.relationships.utterance.id ?
          await this._db.update(new Utterance({ id: req.params.id }), data.relationships.utterance.attributes) :
          await this._db.create(new Utterance(data.relationships.utterance.attributes));
        data.relationships.utterance = helpers.toJsonApi(utterance);
        break;
      default:
        let website = data.relationships.website.id ?
          await this._db.update(new Website({ id: req.params.id }), data.relationships.website.attributes) :
          await this._db.create(new Website(data.relationships.website.attributes));
        data.relationships.website = helpers.toJsonApi(website);
    }

    citation.modifiedAt = moment().toJSON();
    citation.modifiedUserId = req.user.id;
    citation = await this._db.update(new Citation({ id: req.params.id }), citation);
    res.json({ data: helpers.toJsonApi(citation) });
  }
}

module.exports = Citations;
