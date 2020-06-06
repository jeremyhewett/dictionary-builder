const _ = require('lodash');
const moment = require('moment');
const fs = require('fs');
const Database = require('../../server/database/Database');

const Bibliographical = require('./types/Bibliographical');
const DictionaryEntry = require('./types/DictionaryEntry');
const Keyword = require('./types/Keyword');
const MediumGenreUpdate = require('./types/MediumGenreUpdate');
const Person = require('./types/Person');
const PeopleList = require('./types/PeopleList');
const Publication = require('./types/Publication');
const Quotation = require('./types/Quotation');

const User = require('../../server/database/types/User');
const Role = require('../../server/database/types/Role');
const Content = require('../../server/database/types/Content');
const UserRole = require('../../server/database/types/UserRole');
const Medium = require('../../server/database/types/Medium');
const Genre = require('../../server/database/types/Genre');
const CitationDisplay = require('../../server/database/types/CitationDisplay');

const contentsData = require('../seedData/contents.json');

let oldDb = new Database({
  //debug: true,
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5555,
    database: 'postgres',
    user: 'postgres',
    password: 'password',
  },
  //pool: { min: 1, max: 1 }
});

let newDb = new Database({
  //debug: true,
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'password'
  },
  //pool: { min: 1, max: 1 }
});

let migrate = async () => {
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

  let contents = await Promise.all(contentsData.map(content => newDb.create(new Content(content))));

  let mediumsByScottishId = {
    '1': await newDb.create(new Medium({ name: 'Book' })),
    '2': await newDb.create(new Medium({ name: 'Cinema' })),
    '3': await newDb.create(new Medium({ name: 'Email' })),
    '4': await newDb.create(new Medium({ name: 'Leaflet/brochure' })),
    '5': await newDb.create(new Medium({ name: 'Magazine (e-zine)' })),
    '6': await newDb.create(new Medium({ name: 'Newspaper' })),
    '7': await newDb.create(new Medium({ name: 'Periodical/Journal' })),
    '8': await newDb.create(new Medium({ name: 'Radio' })),
    '9': await newDb.create(new Medium({ name: 'Theatre' })),
    '10': await newDb.create(new Medium({ name: 'TV' })),
    '11': await newDb.create(new Medium({ name: 'Web' })),
    '12': await newDb.create(new Medium({ name: 'Other' })),
    '13': await newDb.create(new Medium({ name: 'Manuscript' })),
  };

  let genresByScottishId = {
    '1': await newDb.create(new Genre({name: 'Advertisement' })),
    '3': await newDb.create(new Genre({name: 'Announcement' })),
    '4': await newDb.create(new Genre({name: 'Article' })),
    '5': await newDb.create(new Genre({name: 'Biography' })),
    '6': await newDb.create(new Genre({name: 'Cookery' })),
    '7': await newDb.create(new Genre({name: 'Correspondence' })),
    '8': await newDb.create(new Genre({name: 'Diary' })),
    '9': await newDb.create(new Genre({name: 'Drama' })),
    '10': await newDb.create(new Genre({name: 'Essay' })),
    '11': await newDb.create(new Genre({name: 'History' })),
    '12': await newDb.create(new Genre({name: 'Instructions' })),
    '13': await newDb.create(new Genre({name: 'Invoice/bill/receipt' })),
    '14': await newDb.create(new Genre({name: 'Novel' })),
    '15': await newDb.create(new Genre({name: 'Poem/song/ballad' })),
    '16': await newDb.create(new Genre({name: 'Prepared text' })),
    '17': await newDb.create(new Genre({name: 'Prose: fiction' })),
    '18': await newDb.create(new Genre({name: 'Prose: non-fiction' })),
    '19': await newDb.create(new Genre({name: 'Report' })),
    '20': await newDb.create(new Genre({name: 'Review' })),
    '21': await newDb.create(new Genre({name: 'Script' })),
    '22': await newDb.create(new Genre({name: 'Short story' })),
    '23': await newDb.create(new Genre({name: 'Written record of speech' })),
    '24': await newDb.create(new Genre({name: 'Other' })),
  };

  let keywordGroups = _.groupBy(await oldDb.query(new Keyword({ keyword: ['gonfor', 'flechy', 'boond', 'gaun', 'loaft', 'sharger', 'barfit', 'blin', 'greet'] })), 'keyword');
  let authorsByPersonId = {};

  let headwords = await Promise.all(Object.entries(keywordGroups).map(async ([keywordText, keywords]) => {
    let headword = await newDb.create(keywords[0].toHeadword());
    let meanings = await Promise.all(Object.entries(_.groupBy(keywords, kw => kw.toMeaningString())).map(async ([meaningString, keywordsForMeaning]) => {
      let meaning = await newDb.create(keywordsForMeaning[0].toMeaning(headword));
      let quotationIds = keywordsForMeaning.map(kw => kw.quotation);
      let quotations = await oldDb.query(new Quotation({ quotationId: quotationIds }));

      let citations = await Promise.all(quotations.map(async (quotation) => {
        if (quotation.sourceType === 'Bibliographical') {
          let bibliographicSource = await oldDb.get(new Bibliographical({ bibliographicalId: quotation.bibliographicSource }));
          let publication = await oldDb.get(new Publication({ publicationId: bibliographicSource.publication }));
          let peopleLists = await oldDb.query(new PeopleList({ referencedFrom: bibliographicSource.bibliographicalId, referenceId: 2 }));
          if (peopleLists.length === 0) {
            peopleLists = await oldDb.query(new PeopleList({ referencedFrom: publication.publicationId, referenceId: 1 }));
          }
          let peopleList = peopleLists.find(ple => ple.editor) || peopleLists[0];
          let author = null;
          if (peopleList) {
            let personAuthor = await oldDb.get(new Person({ personId: peopleList.person }));
            if (!authorsByPersonId[personAuthor.personId]) {
              authorsByPersonId[personAuthor.personId] = await newDb.create(personAuthor.toAuthor());
            }
            author = authorsByPersonId[personAuthor.personId];
          }
          let mediumUpdate = await oldDb.get(new MediumGenreUpdate({ pubId: publication.publicationId, genre: null }));
          let genreUpdate = await oldDb.get(new MediumGenreUpdate({ pubId: publication.publicationId, medium: null }));
          let medium = mediumUpdate ? mediumsByScottishId[mediumUpdate.medium] : mediumsByScottishId[publication.medium];
          let genre = genreUpdate ? genresByScottishId[genreUpdate.genre] : genresByScottishId[bibliographicSource.genre];
          let source = await newDb.create(bibliographicSource.toSource(publication, author, medium || mediumsByScottishId['12'], genre));
          return newDb.create(quotation.toCitation(meaning, source, users[0]));
        } else if (quotation.sourceType === 'Oral') {
          //let personalSource = await oldDb.get(new Person({ personId: quotation.personalSource }));
        }
      }));
      return meaning;
    }));

    return headword;
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

migrate().then(async () => {
  await oldDb.shutdown();
  await newDb.shutdown();
});
