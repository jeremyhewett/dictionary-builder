import api from 'services/api';
import graphqlApi from 'services/graphqlApi';
import Entry from '../../types/Entry';
import Headword from '../../types/Headword';

const getHeadwords = async (limit) => {
  let query = `{
    headwords {
      id
      headword
      meanings {
        citationsStats {
          count {
            value
          }
        }
      }
    }
  }`;
  return (await graphqlApi.query(query)).headwords;
};

const getHeadword = async (headwordId) => {
  let query = `query($headwordId: ID!) {
    headword(id: $headwordId) {
      id
      headword
      entries {
        id
        firstDraft
        revisedDraft
        semanticallyRevised
        editedForStyle
        proofread
        chiefEditorOk
        finalProofing
      }
      meanings {
        id
        shortMeaning
        citations {
          id
          clippedText
        }
      }
    }
  }`;
  let headword = (await graphqlApi.query(query, { headwordId })).headword;
  headword.entry = new Entry(headword.entries[0]);
  return headword;
};

const createHeadword = async (headword) => {
  return await api.post(`headwords`, headword);
};

const updateHeadword = async (headword) => {
  let query = `mutation($headword: HeadwordInput!) {
    updateHeadword(input: $headword) {
      id
      headword
    }
  }`;
  return (await graphqlApi.query(query, { headword: new Headword(headword) })).updateHeadword;
};

export default { getHeadwords, getHeadword, createHeadword, updateHeadword };
