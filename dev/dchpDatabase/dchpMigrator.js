const _ = require('lodash');
const moment = require('moment');
const fs = require('fs');
const Database = require('../server/database/Database');

const DchpHeadword = require('./types/DchpHeadword');
const DchpEntry = require('./types/DchpEntry');
const DchpMeaning = require('./types/DchpMeaning');
const DchpSource = require('./types/DchpSource');
const DchpCitationMeaning = require('./types/DchpCitationMeaning');
const DchpCitation = require('./types/DchpCitation');
const DchpAuthor = require('./types/DchpAuthor');
const DchpTitle = require('./types/DchpTitle');
const DchpPlace = require('./types/DchpPlace');

const User = require('../server/database/types/User');
const Role = require('../server/database/types/Role');
const UserRole = require('../server/database/types/UserRole');
const CitationDisplay = require('../server/database/types/CitationDisplay');

let oldDb = new Database({
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'dchpca_dchp_2',
  }
});

let newDb = new Database({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'password'
  }
});

let migrate = async() => {
  let users = await Promise.all([
    newDb.create(new User({
      "isActive": true,
      "firstName": "Jeremy",
      "lastName": "Hewett",
      "email": "j@g.com",
      "passwordHash": "$2b$10$PgyeJ/c0RuzH17et4zsc0uGysIgw35pW8wgPZodqbrqOauMfvu7hq",
      "createdAt": moment().toJSON()
    }))
  ]);

  let roles = await Promise.all([
    newDb.create(new Role({ "name": "reviewer" })),
    newDb.create(new Role({ "name": "editor" })),
    newDb.create(new Role({ "name": "admin" }))
  ]);

  let userRoles = await Promise.all([
    newDb.create(new UserRole({ userId: users[0].id, roleId: roles[1].id })),
    newDb.create(new UserRole({ userId: users[0].id, roleId: roles[2].id }))
  ]);

  let dchpEntries = await oldDb.query(new DchpEntry({ headword: ['allophone', 'creamo', 'canot du maître'] }));

  let entries = await Promise.all(dchpEntries.map(async (dchpEntry) => {
    let dchpHeadword = await oldDb.get(new DchpHeadword({ headword: dchpEntry.headword, isTeach: null }));
    let dchpCitations = await oldDb.query(new DchpCitation({ headwordId: dchpHeadword.id }));
    let dchpSources = await oldDb.query(new DchpSource({ id: dchpCitations.map(x => x.sourceId) }));
    let dchpAuthors = await oldDb.query(new DchpAuthor({ id: dchpSources.map(x => x.authorId) }));
    let dchpTitles = await oldDb.query(new DchpTitle({ id: dchpSources.map(x => x.titleId) }));
    let dchpPlaces = await oldDb.query(new DchpPlace({ id: dchpSources.map(x => x.placeId) }));

    let dchpMeanings = await oldDb.query(new DchpMeaning({ entryId: dchpEntry.id }));

    let headword = await newDb.create(dchpEntry.toHeadword());
    let spellingVariants = await Promise.all(dchpEntry.toSpellingVariants(headword)
      .map(sv => newDb.create(sv)));
    let entry = await newDb.create(dchpEntry.toEntry(headword, users[0]));
    let meanings = await Promise.all(dchpMeanings
      .filter(dchpMeaning => dchpMeaning.entryId === dchpEntry.id)
      .map(async dchpMeaning => {
        let meaning = await newDb.create(dchpMeaning.toMeaning(headword, dchpCitations));
        let meaningDisplay = await newDb.create(dchpMeaning.toMeaningDisplay(entry, meaning));
        let dchpCitationsMeanings = await oldDb.query(new DchpCitationMeaning({ meaningId: dchpMeaning.id }));
        let citations = await Promise.all(dchpCitations.map(async dchpCitation => {
          let dchpSource = dchpSources.find(s => s.id === dchpCitation.sourceId);
          let source = null;
          if (dchpSource) {
            let dchpAuthor = dchpAuthors.find(a => a.id === dchpSource.authorId);
            let dchpTitle = dchpTitles.find(a => a.id === dchpSource.titleId);
            let dchpPlace = dchpPlaces.find(a => a.id === dchpSource.placeId);
            source = await newDb.create(dchpSource.toSource(dchpAuthor, dchpTitle, dchpPlace));
          }
          let citation = await newDb.create(dchpCitation.toCitation(meaning, users[0], source, spellingVariants));
          let dchpCitationMeaning = dchpCitationsMeanings.find(cm => cm.citationId === dchpCitation.id);
          let citationDisplay = dchpCitationMeaning ? await newDb.create(new CitationDisplay({ meaningDisplayId: meaningDisplay.id, citationId: citation.id })) : null;
          return citation;
        }));
      }));
  }));
};

//let model = new Model(oldDb);

let writeJson = async (fileName, data) => {
  return new Promise((res, rej) => {
    fs.writeFile(fileName, JSON.stringify(data, null, 2), 'utf8', (err) => {
      if (err) {
        rej(err);
      } else {
        res();
      }
    });
  });
};

/*let run = async () => {
  let entries = await model.entries(['allophone', 'creamo', 'canot du maître']);
  let meanings = await model.meanings(entries);
  let meaningEntryLinks = await model.meaningEntryLinks(meanings);
  let linkedEntries = await model.linkedEntries(meaningEntryLinks);
  entries = entries.concat(linkedEntries);
  meanings = meanings.concat(await model.meanings(linkedEntries));

  let usageNotes = await model.usageNotes(meanings);

  let citationMeaningLinks = await model.citationMeaningLinks(meanings);
  let citations = await model.citations(citationMeaningLinks);
  let sources = await model.sources(citations);
  let authors = await model.authors(sources);
  let places = await model.places(sources);
  let titles = await model.titles(sources);

  let entryReferenceLinks = await model.entryReferenceLinks(entries);
  let references = await model.references(entryReferenceLinks);

  let images = await model.images(entries);

  let headwords = entries.map((entry, i) => ({
    _id: i + 1,
    headword: entry.headword
  }));
  entries.forEach((entry, i) => {
    entry._id = i + 1;
    entry.headwordId = i + 1;
  });
  meanings.forEach((meaning, i) => {
    meaning._id = i + 1;
    let entry = entries.find(e => e.id === meaning.entry_id);
    meaning.entryId = entry._id;
  });
  meaningEntryLinks.forEach((link, i) => {
    link._id = i + 1;
    let meaning = meanings.find(m => m.id === link.meaning_id);
    let entry = entries.find(e => e.id === link.entry_id);
    link.meaningId = meaning._id;
    link.entryId = entry._id;
  });
  usageNotes.forEach((note, i) => {
    note._id = i + 1;
    let meaning = meanings.find(m => m.id === note.meaning_id);
    note.meaningId = meaning._id;
  });
  let books = [], periodicals = [], websites = [], utterances = [];
  sources.forEach((source, i) => {
    if (source.author_id) {
      let author = authors.find(a => a.id === source.author_id);
      source.author = author.name;
    }
    if (source.title_id) {
      let title = titles.find(t => t.id === source.title_id);
      source.title = title.name;
    }
    if (source.place_id) {
      let place = places.find(p => p.id === source.place_id);
      source.place = place.name;
    }
    switch(source.type_id) {
      case 0:
        books.push(source);
        break;
      case 1:
        periodicals.push(source);
        break;
      case 2:
        websites.push(source);
        break;
      case 3:
        utterances.push(source);
        break;
      default:
        throw `source has unknown type_id: ${source.type_id}`
    }
  });
  books.forEach((book, i) => {
    book._id = i + 1;
  });
  periodicals.forEach((periodical, i) => {
    periodical._id = i + 1;
  });
  websites.forEach((website, i) => {
    website._id = i + 1;
  });
  utterances.forEach((utterance, i) => {
    utterance._id = i + 1;
  });

  citations.forEach((citation, i) => {
    citation._id = i + 1;
    citation.user_id = 1;
    citation.last_modified_user_id = 1;
    let source = sources.find(s => s.id === citation.source_id);
    source.citationId = citation._id;
    switch(source.type_id) {
      case 0:
        citation.source_type = 'books';
        break;
      case 1:
        citation.source_type = 'periodicals';
        break;
      case 2:
        citation.source_type = 'websites';
        break;
      case 3:
        citation.source_type = 'utterances';
        break;
      default:
        throw 'unknown source type'
    }
    delete citation.source_id;
    let citationMeaningLink = citationMeaningLinks.find(l => l.citation_id === citation.id);
    let meaning = meanings.find(m => m.id === citationMeaningLink.meaning_id);
    let entry = entries.find(e => e.id === meaning.entry_id);
    citation.headwordId = entry.headwordId;
  });
  citationMeaningLinks.forEach((link, i) => {
    link._id = i + 1;
    let meaning = meanings.find(m => m.id === link.meaning_id);
    let citation = citations.find(c => c.id === link.citation_id);
    link.meaningId = meaning._id;
    link.citationId = citation._id;
  });
  references.forEach((reference, i) => {
    reference._id = i + 1;
  });
  entryReferenceLinks.forEach((link, i) => {
    link._id = i + 1;
    let reference = references.find(r => r.id === link.reference_id);
    let entry = entries.find(e => e.id === link.entry_id);
    link.referenceId = reference._id;
    link.entryId = entry._id;
  });
  images.forEach((image, i) => {
    image._id = i + 1;
    let entry = entries.find(e => e.id === image.entry_id);
    image.entryId = entry._id;
  });

  let roles = [
    {
      "id": 1,
      "name": "reviewer"
    },
    {
      "id": 2,
      "name": "editor"
    },
    {
      "id": 3,
      "name": "admin"
    }
  ];
  let users = [{
    "id": 1,
    "isActive": true,
    "firstName": "Jeremy",
    "lastName": "Hewett",
    "email": "j@g.com",
    "passwordHash": "$2b$10$PgyeJ/c0RuzH17et4zsc0uGysIgw35pW8wgPZodqbrqOauMfvu7hq"
  }];
  let userRoleLinks = [{
    userId: 1,
    roleId: 3
  }, {
    userId: 1,
    roleId: 2
  }];

  headwords = headwords.map(entity => model.headword(entity));
  entries = entries.map(entity => model.entry(entity));
  meanings = meanings.map(entity => model.meaning(entity));
  meaningEntryLinks = meaningEntryLinks.map(entity => model.meaningEntryLink(entity));
  usageNotes = usageNotes.map(entity => model.usageNote(entity));
  citations = citations.map(entity => model.citation(entity));
  citationMeaningLinks = citationMeaningLinks.map(entity => model.citationMeaningLink(entity));
  books = books.map(entity => model.book(entity));
  periodicals = periodicals.map(entity => model.periodical(entity));
  websites = websites.map(entity => model.website(entity));
  utterances = utterances.map(entity => model.utterance(entity));
  references = references.map(entity => model.reference(entity));
  entryReferenceLinks = entryReferenceLinks.map(entity => model.entryReferenceLink(entity));
  images = images.map(entity => model.image(entity));

  await writeJson('./dev/seedData/roles.json', roles);
  await writeJson('./dev/seedData/users.json', users);
  await writeJson('./dev/seedData/userRoleLinks.json', userRoleLinks);
  await writeJson('./dev/seedData/headwords.json', headwords);
  await writeJson('./dev/seedData/entries.json', entries);
  await writeJson('./dev/seedData/meanings.json', meanings);
  await writeJson('./dev/seedData/meaningEntryLinks.json', meaningEntryLinks);
  await writeJson('./dev/seedData/usageNotes.json', usageNotes);
  await writeJson('./dev/seedData/citations.json', citations);
  await writeJson('./dev/seedData/citationMeaningLinks.json', citationMeaningLinks);
  await writeJson('./dev/seedData/books.json', books);
  await writeJson('./dev/seedData/periodicals.json', periodicals);
  await writeJson('./dev/seedData/websites.json', websites);
  await writeJson('./dev/seedData/utterances.json', utterances);
  await writeJson('./dev/seedData/references.json', references);
  await writeJson('./dev/seedData/entryReferenceLinks.json', entryReferenceLinks);
  await writeJson('./dev/seedData/images.json', images);

  console.log(JSON.stringify(citations, null, 2));
};*/

migrate().finally(async () => {
  await oldDb.shutdown();
  await newDb.shutdown();
});
