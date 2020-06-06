const _ = require('lodash');
const express = require('express');
const helpers = require('../helpers');
const db = require('../database/db');
const Auth = require('../auth/Auth');
const Entry = require('../database/types/Entry');
const Headword = require('../database/types/Headword');
const Meaning = require('../database/types/Meaning');
const Citation = require('../database/types/Citation');

class Entries {
  constructor(config = {}) {
    this._db = db;
    let auth = new Auth(config);
    this.router = express.Router();
    this.router.get('/', this.getEntries.bind(this));
    this.router.get('/:id', this.getEntry.bind(this));
  }

  async getEntries(req, res) {
    let entries = await this._db.query(new Entry());
    let entryIds = entries.map(entry => entry.id);
    let headwordIds = entries.map(entry => entry.headwordId);
    let [headwords, meanings] = await Promise.all([
      this._db.query(new Headword({ id: headwordIds })),
      this._db.query(new Meaning({ entryId: entryIds }))
    ]);
    let meaningsByEntryId = _.groupBy(meanings, 'entryId');

    let data = entries.map(helpers.toJsonApi);
    data.forEach(entry => {
      entry.relationships = {
        headword: helpers.toJsonApi(headwords.find(h => h.id === entry.attributes.headwordId)),
        meanings: meaningsByEntryId[entry.id].map(helpers.toJsonApi)
      }
    });

    res.json({ data });
  }

  async getEntry(req, res) {
    let id = req.params.id;

    let entry = await this._db.get(new Entry({ id }));
    let [headword, meaningDisplays, referenceDisplays] = await Promise.all([
      this._db.get(new Headword({ id: entry.headwordId })),
      this._db.query(new MeaningDisplay({ entryId: id })),
      this._db.query(new ReferenceDisplay({ entryId: id })),
    ]);
    let [meanings, citationDisplays, references] = await Promise.all([
      this._db.query(new Meaning({ id: _.map(meaningDisplays, 'meaningId') })),
      this._db.query(new CitationDisplay({ meaningId: _.map(meaningDisplays, 'id') })),
      this._db.query(new Reference({ id: _.map(referenceDisplays, 'referenceId') })),
    ]);
    let citations = await this._db.query(new Citation({ id: _.map(citationDisplays, 'citationId') }));
    let sources = await this._db.query(new Source({ id: _.map(citations, 'sourceId') }));

    let citationsById = _.keyBy(citations, 'id');
    citationLinks.forEach(link => link.citation = citationsById[link.citationId]);
    let citationLinksByMeaningId = _.groupBy(citationLinks, 'meaningId');

    let data = Object.assign(helpers.toJsonApi(entry), {
      relationships: {
        headword: helpers.toJsonApi(headword),
        meaningDisplays: meaningDisplays.map(meaningDisplay => Object.assign(helpers.toJsonApi(meaningDisplay), {
          relationships: {
            citations: citationLinksByMeaningId[meaningDisplay.id].map(link => Object.assign(helpers.toJsonApi(link.citation), {
              relationships: {
                book: helpers.toJsonApi(booksByCitationId[link.citation.id]),
                periodical: helpers.toJsonApi(periodicalsByCitationId[link.citation.id]),
                website: helpers.toJsonApi(websitesByCitationId[link.citation.id]),
                utterance: helpers.toJsonApi(utterancesByCitationId[link.citation.id])
              }
            }))
          }
        }))
      }
    });

    res.json({ data });
  }
}

module.exports = Entries;
