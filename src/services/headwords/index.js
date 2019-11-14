import api from 'services/api';

const getHeadwords = async (limit) => {
  return await api.get(`headwords`);
};

const getHeadword = async (headwordId) => {
  return await api.get(`headwords/${headwordId}`);
};

const createHeadword = async (headword) => {
  return await api.post(`headwords`, headword);
};

const updateHeadword = async (headword) => {
  return await api.put(`headwords/${headword.id}`, headword);
};

export default { getHeadwords, getHeadword, createHeadword, updateHeadword };
