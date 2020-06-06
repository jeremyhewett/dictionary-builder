const _ = require('lodash');
const express = require('express');
const helpers = require('../helpers');
const db = require('../database/db');
const Auth = require('../auth/Auth');
const Headword = require('../database/types/Headword');
const Entry = require('../database/types/Entry');
const Citation = require('../database/types/Citation');

class Headwords {
  constructor(config = {}) {
    this._db = db;
    let auth = new Auth(config);
    this.router = express.Router();
    this.router.get('/', auth.authorize('editor', this.bind(this.getHeadwords)));
    this.router.get('/:id', auth.authorize('editor', this.bind(this.getHeadword)));
    this.router.post('/', auth.authorize('editor', this.bind(this.createHeadword)));
    this.router.put('/:id', auth.authorize('editor', this.bind(this.updateHeadword)));
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

  async getHeadwords(req, res) {
    let headwords = await this._db.query(new Headword());
    let citationCounts = await this._db.count(new Citation(), 'headwordId');

    let data = headwords.map(helpers.toJsonApi);
    data.forEach(headword => {
      let citationCount = citationCounts.find(c => c.headwordId === headword.id);
      headword.relationships = {
        citations: {
          count: citationCount ? citationCount.count : 0
        }
      }
    });

    res.json({ data });
  }

  async getHeadword(req, res) {
    let id = req.params.id;
    let headword = await this._db.get(new Headword({ id }));
    let citations = await this._db.query(new Citation({ headwordId: id }));
    let entries = await this._db.query(new Entry({ headwordId: id }));
    let entry = entries.length ? entries[0] : null;

    let data = helpers.toJsonApi(headword);
    data.relationships = {
      entry: entry,
      citations: citations.map(helpers.toJsonApi)
    };
    if (entry) {
      let stages = [
        'firstDraft',
        'revisedDraft',
        'semanticallyRevised',
        'editedForStyle',
        'proofread',
        'chiefEditorOk',
        'finalProofing'
      ];
      let stage = _.findLastIndex(stages, s => entry[s]) + 1;
      data.meta = {
        completeness: stage * 100 / stages.length
      }
    } else {
      data.meta = {
        completeness: 0
      };
    }

    res.json({ data });
  }

  async createHeadword(req, res) {
    let { data } = req.body;
    let headword = Object.assign(new Headword(data.attributes));
    headword = await this._db.create(headword);
    res.json({ data: helpers.toJsonApi(headword) });
  }

  async updateHeadword(req, res) {
    let { data } = req.body;
    let headword = Object.assign(new Headword(data.attributes), { id: req.params.id });
    headword = await this._db.update(new Headword({ id: req.params.id }), headword);
    res.json({ data: helpers.toJsonApi(headword) });
  }
}

module.exports = Headwords;
