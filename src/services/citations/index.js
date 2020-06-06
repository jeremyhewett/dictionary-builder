import api from 'services/api';
import graphqlApi from 'services/graphqlApi';
import Meaning from '../../types/Meaning';
import Citation from '../../types/Citation';
import Source from '../../types/Source';

const citationFields = `
  id
  text
  clipStart
  clipEnd
  clippedText
  isIncomplete
  memo
  meaning {
    id
    shortMeaning
    partOfSpeech
    headwordId
    headword {
      id
      headword
    }
  }
  spellingVariant {
    id
    spellingVariant
  }
  source {
    id
    medium {
      id
      name
    }
    genre {
      id
      name
    }
    author {
      id
      surname
      forenames
    }
    yearPublished
    datePublished
    titleOfWork
    titleOfPublication
    location
    publisher
    volumeNumber
    issueNumber
    pageRange
    url
  }
`;

const getCitations = async (limit) => {
  return await api.get(`citations`);
};

const getCitation = async (citationId) => {
  let query = `query($id: ID!) {
    citation(id: $id) {
      ${citationFields}
    }
  }`;
  return (await graphqlApi.query(query, { id: citationId })).citation;
};

class CreateHeadwordQuery {
  constructor(headword) {
    this.key = `headword`;
    this.type = 'HeadwordInput!';
    this.args = { [this.key]: headword };
  }

  toString() {
    return `createHeadword(input: $${this.key}) {
      id
      headword
    }`;
  }
}

class CreateMeaningQuery {
  constructor(meaning) {
    this.key = `meaning`;
    this.type = 'MeaningInput!';
    this.args = { [this.key]: meaning };
  }

  toString() {
    return `createMeaning(input: $${this.key}) {
      id
      headwordId
      partOfSpeech
      shortMeaning
    }`;
  }
}

class UpdateCitationQuery {
  constructor(citation) {
    this.key = `citation${citation.id}`;
    this.type = 'CitationInput!';
    this.args = { [this.key]: citation };
  }

  toString() {
    return `updateCitation(input: $${this.key}) {
      ${citationFields}
    }`;
  }
}

class UpdateSourceQuery {
  constructor(source) {
    this.key = `source${source.id}`;
    this.type = 'SourceInput!';
    this.args = { [this.key]: source };
  }

  toString() {
    return `updateSource(input: $${this.key}) {
      id
    }`;
  }
}

const combineQueries = (queries) => {
  let query = `mutation(${queries.map(q => `$${q.key}: ${q.type}`)}) {
    ${queries.join('\n')}
  }`;
  let args = Object.assign({}, ...queries.map(q => q.args));
  return { query, args };
};

const updateCitation = async (citation) => {
  let queries = [];
  if (!citation.meaning.id) {
    if (!citation.meaning.headword.id) {
      queries.push(new CreateHeadwordQuery(citation.meaning.headword));
      citation.meaning.headwordId = '$createHeadword.id';
    } else {
      citation.meaning.headwordId = citation.meaning.headword.id;
    }
    queries.push(new CreateMeaningQuery(new Meaning(citation.meaning)));
    citation.meaningId = '$createMeaning.id';
  } else {
    citation.meaningId = citation.meaning.id;
  }

  //queries.push(new UpdateSourceQuery(new Source(citation.source)));
  queries.push(new UpdateCitationQuery(new Citation(citation)));
  let { query, args } = combineQueries(queries);
  let response = await graphqlApi.query(query, args);
  if (response.errors) {
    throw response.errors[0];
  }
  return response.updateCitation;
};

const createCitation = async (citation) => {
  return await api.post(`citations`, citation);
};

const getHeadwords = async() => {
  let query = `{
    headwords {
      id
      headword
    }
  }`;
  return (await graphqlApi.query(query)).headwords;
};

const getMeanings = async(headword) => {
  let query = `query($where: String!) {
    meanings(where: $where) {
      id
      headwordId
      shortMeaning
      partOfSpeech
    }
  }`;
  let args = { where: JSON.stringify({ headwordId: headword.id })};
  return (await graphqlApi.query(query, args)).meanings;
};

export default { getCitations, getCitation, updateCitation, createCitation, getHeadwords, getMeanings };
