const _ = require('lodash');
const moment = require('moment');
const Database = require('../server/database/Database');
const Headword = require('../server/database/types/Headword');
const Citation = require('../server/database/types/Citation');
const Entry = require('../server/database/types/Entry');
const MeaningEntryLink = require('../server/database/types/MeaningEntryLink');
const CitationMeaningLink = require('../server/database/types/CitationMeaningLink');
const Image = require('../server/database/types/Image');
const Meaning = require('../server/database/types/Meaning');
const Reference = require('../server/database/types/Reference');
const EntryReferenceLink = require('../server/database/types/EntryReferenceLink');
const Book = require('../server/database/types/Book');
const Periodical = require('../server/database/types/Periodical');
const Website = require('../server/database/types/Website');
const Utterance = require('../server/database/types/Utterance');
const UsageNote = require('../server/database/types/UsageNote');
const User = require('../server/database/types/User');

class Model {
  constructor(client) {
    this._client = client;
    this._database = new Database({});
  }

  async headwords(headwords) {
    let filter = headwords.map(headword => `headword = '${headword}'`).join(' OR ');
    return await this._query(`SELECT * FROM headword WHERE ${filter}`);
  }

  async entries(headwords) {
    let filter = headwords.map(headword => `headword = '${headword}'`).join(' OR ');
    return await this._query(`SELECT * FROM det_entries WHERE ${filter}`);
  }

  async meanings(entries) {
    entries = Array.isArray(entries) ? entries : [entries];
    let ids = entries.map(entry => entry.id).filter(x => x);
    return await this._query(`SELECT * FROM det_meanings WHERE entry_id IN (${ids.join(', ')})`);
  }

  async citationMeaningLinks(meanings) {
    meanings = Array.isArray(meanings) ? meanings : [meanings];
    let ids = meanings.map(m => m.id).filter(x => x);
    let links = await this._query(`SELECT * FROM det_citations_meanings INNER JOIN citation on citation.id = citation_id WHERE meaning_id IN (${ids.join(', ')})`);
    return links.map(link => ({
      id: link.id,
      meaning_id: link.meaning_id,
      citation_id: link.citation_id
    }));
  }

  async citations(citationMeaningLinks) {
    let refs = Array.isArray(citationMeaningLinks) ? citationMeaningLinks : [citationMeaningLinks];
    let citationIds = refs.map(ref => ref.citation_id).filter(x => x);
    return await this._query(`SELECT * FROM citation WHERE id IN (${citationIds.join(', ')})`);
  }

  async sources(citations) {
    citations = Array.isArray(citations) ? citations : [citations];
    let sourceIds = citations.map(c => c.source_id).filter(x => x);
    return await this._query(`SELECT * FROM source WHERE id IN (${sourceIds.join(', ')})`);
  }

  async meaningEntryLinks(meanings) {
    meanings = Array.isArray(meanings) ? meanings : [meanings];
    let ids = meanings.map(m => m.id).filter(x => x);
    let links = await this._query(`SELECT * FROM det_entries_meanings INNER JOIN det_entries ON det_entries.id = entry_id WHERE meaning_id IN (${ids.join(', ')})`);
    return links.map(link => ({
      id: link.id,
      meaning_id: link.meaning_id,
      entry_id: link.entry_id,
      linknote: link.linknote
    }));
  }

  async linkedEntries(meaningEntryLinks) {
    let refs = Array.isArray(meaningEntryLinks) ? meaningEntryLinks : [meaningEntryLinks];
    let entryIds = refs.map(ref => ref.entry_id).filter(x => x);
    return await this._query(`SELECT * FROM det_entries WHERE id IN (${entryIds.join(', ')})`);
  }

  async usageNotes(meanings) {
    meanings = Array.isArray(meanings) ? meanings : [meanings];
    let meaningIds = meanings.map(meaning => meaning.id).filter(x => x);
    return await this._query(`SELECT * FROM det_usage_notes WHERE meaning_id IN (${meaningIds.join(', ')})`);
  }

  async images(entries) {
    entries = Array.isArray(entries) ? entries : [entries];
    let entryIds = entries.map(entry => entry.id).filter(x => x);
    return await this._query(`SELECT * FROM det_images WHERE entry_id IN (${entryIds.join(', ')})`);
  }

  async entryReferenceLinks(entries) {
    entries = Array.isArray(entries) ? entries : [entries];
    let entryIds = entries.map(entry => entry.id).filter(x => x);
    let links = await this._query(`SELECT * FROM det_entries_references INNER JOIN det_references on det_references.id = reference_id WHERE entry_id IN (${entryIds.join(', ')})`);
    return links.map(link => ({
      id: link.id,
      entry_id: link.entry_id,
      reference_id: link.reference_id,
      sv_text: link.sv_text,
      link_text: link.link_text,
      link_target: link.link_target,
      date_accessed: link.date_accessed
    }));
  }

  async references(referenceLinks) {
    referenceLinks = Array.isArray(referenceLinks) ? referenceLinks : [referenceLinks];
    let referenceIds = referenceLinks.map(ref => ref.reference_id).filter(x => x);
    return await this._query(`SELECT * FROM det_references WHERE id IN (${referenceIds.join(', ')})`);
  }

  async authors(sources) {
    sources = Array.isArray(sources) ? sources : [sources];
    let authorIds = sources.map(source => source.author_id).filter(x => x);
    return await this._query(`SELECT * FROM author WHERE id IN (${authorIds.join(', ')})`);
  }

  async titles(sources) {
    sources = Array.isArray(sources) ? sources : [sources];
    let titleIds = sources.map(source => source.title_id).filter(x => x);
    return await this._query(`SELECT * FROM title WHERE id IN (${titleIds.join(', ')})`);
  }

  async places(sources) {
    sources = Array.isArray(sources) ? sources : [sources];
    let placeIds = sources.map(source => source.place_id).filter(x => x);
    return await this._query(`SELECT * FROM place WHERE id IN (${placeIds.join(', ')})`);
  }

  async _query(query) {
    return await this._client.query(query);
  }

  author(entity) {
    let author = new Author(this._database._keysToCamelCaseRecursive(entity));
    return this._mapValues(author);
  }

  citation(entity) {
    let citation = new Citation(this._database._keysToCamelCaseRecursive(entity));
    citation.createdAt = this._trimmedOrNull(entity.created);
    citation.modifiedAt = this._trimmedOrNull(entity.last_modified);
    citation.modifiedUserId = entity.last_modified_user_id;
    citation.isIncomplete = entity.is_incomplete === true;
    return this._mapValues(citation);
  }

  headword(entity) {
    let headword = new Headword(this._database._keysToCamelCaseRecursive(entity));
    return this._mapValues(headword);
  }

  entry(entity) {
    let entry = new Entry(this._database._keysToCamelCaseRecursive(entity));
    return this._mapValues(entry);
  }

  entryReferenceLink(entity) {
    let link = _.mapValues(new MeaningEntryLink(this._database._keysToCamelCaseRecursive(entity)), this._trimmedOrNull);
    link.accessedAt = this._trimmedOrNull(link.accessed_at);
    return this._mapValues(link);
  }

  image(entity) {
    let image = new Image(this._database._keysToCamelCaseRecursive(entity));
    return this._mapValues(image);
  }

  meaning(entity) {
    let meaning = new Meaning(this._database._keysToCamelCaseRecursive(entity));
    meaning.orderLetter = this._trimmedOrNull(entity.orderletter);
    meaning.orderNum = entity.ordernum;
    meaning.partOfSpeech = this._trimmedOrNull(entity.partofspeech);
    return this._mapValues(meaning);
  }

  book(source) {
    let book = this._mapValues(new Book(this._database._keysToCamelCaseRecursive(source)));
    book.urlAccessedAt = this._trimmedOrNull(source.url_access_date, value => moment(value, "D MMM. YYYY").toJSON());
    book.yearPublished = this._trimmedOrNull(source.year_published, value => moment(value, "D MMM. YYYY").year());
    return book;
  }

  periodical(source) {
    let periodical = this._mapValues(new Periodical(this._database._keysToCamelCaseRecursive(source)));
    periodical.urlAccessedAt = this._trimmedOrNull(source.url_access_date, value => moment(value, "D MMM. YYYY").toJSON());
    periodical.issue = this._trimmedOrNull(source.volume_issue);
    periodical.issueDate = this._trimmedOrNull(source.periodical_date, value => moment(value, "D MMM. YYYY").toJSON());
    periodical.issueDateTimezone = this._trimmedOrNull(source.dateline);
    return periodical;
  }

  website(source) {
    let website = this._mapValues(new Website(this._database._keysToCamelCaseRecursive(source)));
    website.urlAccessedAt = this._trimmedOrNull(source.url_access_date, value => moment(value, "D MMM. YYYY").toJSON());
    website.publishedDate = this._trimmedOrNull(source.periodical_date, value => moment(value, "D MMM. YYYY").toJSON());
    return website;
  }

  utterance(source) {
    let utterance = this._mapValues(new Utterance(this._database._keysToCamelCaseRecursive(source)));
    utterance.urlAccessedAt = this._trimmedOrNull(source.url_access_date, value => moment(value, "D MMM. YYYY").toJSON());
    utterance.utteranceDate = this._trimmedOrNull(source.periodical_date, value => moment(value, "D MMM. YYYY").toJSON());
    utterance.media = this._trimmedOrNull(source.utterance_media);
    utterance.broadcast = this._trimmedOrNull(source.utterance_broadcast);
    utterance.witness = this._trimmedOrNull(source.utterance_witness);
    return utterance;
  }

  reference(entity) {
    return this._mapValues(new Reference(this._database._keysToCamelCaseRecursive(entity)));
  }

  entryReferenceLink(entity) {
    let link = new EntryReferenceLink(this._database._keysToCamelCaseRecursive(entity));
    link.accessedAt = entity.date_accessed;
    return this._mapValues(link);
  }

  title(entity) {
    return this._mapValues(new Title(this._database._keysToCamelCaseRecursive(entity)));
  }

  usageNote(entity) {
    return this._mapValues(new UsageNote(this._database._keysToCamelCaseRecursive(entity)));
  }

  user(entity) {
    return this._mapValues(new User(this._database._keysToCamelCaseRecursive(entity)));
  }

  meaningEntryLink(entity) {
    return this._mapValues(new MeaningEntryLink(this._database._keysToCamelCaseRecursive(entity)));
  }

  citationMeaningLink(entity) {
    return this._mapValues(new CitationMeaningLink(this._database._keysToCamelCaseRecursive(entity)));
  }

  _mapValues(entity) {
    return _.mapValues(entity, value => {
      if (typeof value === 'string') {
        return this._trimmedOrNull(value);
      }
      return value;
    });
  }

  _trimmedOrNull(value, parser) {
    return value && value.trim() ? parser ? parser(value.trim()) : value.trim() : null;
  }
}

module.exports = Model;
