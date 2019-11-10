const _ = require('lodash');
const express = require('express');
const helpers = require('../helpers');
const Database = require('../database/Database');
const Auth = require('../auth/Auth');
const Entry = require('../database/types/Entry');
const Headword = require('../database/types/Headword');
const Meaning = require('../database/types/Meaning');
const CitationMeaningLink = require('../database/types/CitationMeaningLink');
const Citation = require('../database/types/Citation');
const Book = require('../database/types/Book');
const Periodical = require('../database/types/Periodical');
const Website = require('../database/types/Website');
const Utterance = require('../database/types/Utterance');

class Entries {
  constructor(config = {}) {
    this._db = new Database();
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
    let [headword, meanings] = await Promise.all([
      this._db.get(new Headword({ id: entry.headwordId })),
      this._db.query(new Meaning({ entryId: id }))
    ]);
    let citationLinks = await this._db.query(new CitationMeaningLink({ meaningId: _.map(meanings, 'id') }));
    let citations = await this._db.query(new Citation({ id: _.map(citationLinks, 'citationId') }));
    let citationIds = _.map(citations, 'id');
    let [books, periodicals, websites, utterances] = await Promise.all([
      this._db.query(new Book({ citationId: citationIds })),
      this._db.query(new Periodical({ citationId: citationIds })),
      this._db.query(new Website({ citationId: citationIds })),
      this._db.query(new Utterance({ citationId: citationIds }))
    ]);

    let booksByCitationId = _.keyBy(books, 'citationId');
    let periodicalsByCitationId = _.keyBy(periodicals, 'citationId');
    let websitesByCitationId = _.keyBy(websites, 'citationId');
    let utterancesByCitationId = _.keyBy(utterances, 'citationId');
    let citationsById = _.keyBy(citations, 'id');
    citationLinks.forEach(link => link.citation = citationsById[link.citationId]);
    let citationLinksByMeaningId = _.groupBy(citationLinks, 'meaningId');

    let data = Object.assign(helpers.toJsonApi(entry), {
      relationships: {
        headword: helpers.toJsonApi(headword),
        meanings: meanings.map(meaning => Object.assign(helpers.toJsonApi(meaning), {
          relationships: {
            citations: citationLinksByMeaningId[meaning.id].map(link => Object.assign(helpers.toJsonApi(link.citation), {
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
