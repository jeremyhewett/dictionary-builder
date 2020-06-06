import api from 'services/graphqlApi';

class Cache {
  constructor() {
    this._cache = {};
  }

  set(type, value) {
    let values = this._cache[type] || [];
    let i = values.findIndex(e => e.id === value.id);
    if (i > -1) {
      values = [...values.slice(0, i), value, ...values.slice(i + 1)];
    } else {
      values.push(value);
    }
    this._cache[type] = values;
  }

  get(type, id) {
    if (!this._cache[type]) return undefined;
    return this._cache[type].find(v => v.id === id);
  }
}

export const getEntries = async (limit) => {
  let query = `{
    entries {
      id
      headword {
        headword
      }
    }
  }`;
  return (await api.query(query)).entries;
};

export const getEntry = async (entryId) => {
  let query = `{
    entry {
      id
      headword {
        headword
      }
      meaningDisplays {
        meaning {
          partOfSpeech
          definition
        }
        citationDisplays {
          citation {
            text
            source {
              author {
                title
                surname
                forenames
              }
              titleOfWork
              titleOfPublication
            }
          }
        }
      }
    }
  }`;
  return await api.query(query);
};
