import api from 'services/api';

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

const getHeadwords = async (limit) => {
  return await api.get(`headwords`);
};

const getHeadword = async (headwordId) => {
  return await api.get(`headwords/${headwordId}`);
};

const createHeadword = async (headword) => {
  return await api.post(`headwords/${headword.id}`, headword);
};

const updateHeadword = async (headword) => {
  return await api.put(`headwords/${headword.id}`, headword);
};

export default { getHeadwords, getHeadword, createHeadword, updateHeadword };
